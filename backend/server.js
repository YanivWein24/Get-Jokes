import dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import _ from 'lodash' // enables _.capitalize()
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import GoogleStrategy from 'passport-google-oauth20'
import FacebookStrategy from 'passport-facebook'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import userSchema from './config/userSchema.js'
import jokeSchema from './config/jokeSchema.js'
import twoPartJokeSchema from './config/twoPartJokeSchema.js'
import passportConfig from './config/passportConfig.js'

dotenv.config()
GoogleStrategy.Strategy
FacebookStrategy.Strategy
passportLocal.Strategy

connectDB()

const app = express()

//? ----------------------------------- Middleware: -----------------------------------
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({    //? using express-session
    secret: 'A long string which is the secret key.', // just set as a long string
    resave: false, // default
    saveUninitialized: true,  // default
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // equals to 1 day
    }
}))

app.use(express.json()) // needed to allow the server accept data from axios requests
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)
//? -------------------------------- End Of Middleware: --------------------------------

//? Use this to check out updates in the session:
// app.use((req, res, next) => {
// console.log(req.session.passport)
// console.log(req.user)
// next()
// })


//? creating the User model with userSchema
const User = mongoose.model('User', userSchema)
const Joke = mongoose.model('Joke', jokeSchema)
const TwoPartJoke = mongoose.model('TwoPartJoke', twoPartJokeSchema)


// https://www.passportjs.org/packages/passport-google-oauth20/ 
passport.use(new GoogleStrategy({
    clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    callbackURL: "https://get-jokes-gen.herokuapp.com/auth/google/redirect",
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleID: profile.id, email: "g-" + profile.emails[0].value,
            firstName: profile.name.givenName, lastName: profile.name.familyName
        }, function (err, user) {
            //? "findOrCreate" is not a mongoose function, we need to require it - 'npm i mongoose-findorcreate'
            //? after requiring, we need to add this function to the userSchema as a plugin (see in userSchema.js)
            // console.log(profile)
            if (err) { console.log(err) }
            return cb(err, user)
        })
    }
))

// https://www.passportjs.org/packages/passport-facebook/
passport.use(new FacebookStrategy({
    clientID: process.env.REACT_APP_FACEBOOK_APP_ID,
    clientSecret: process.env.REACT_APP_FACEBOOK_APP_SECRET,
    callbackURL: "https://get-jokes-gen.herokuapp.com/auth/facebook/redirect",
    profileFields: ['id', 'emails', 'name']
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            facebookID: profile.id, email: "f-" + profile.emails[0].value,
            firstName: profile.name.givenName, lastName: profile.name.familyName
        }, function (err, user) {
            if (err) { console.log(err) }
            return cb(err, user)
        })
    }
))

//? ----------------------------------- Routes: -----------------------------------
// app.get('/', (req, res) => res.send('API is running...'))

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) // 10 salting rounds
    const newUser = new User({
        firstName: _.capitalize(firstName),
        lastName: _.capitalize(lastName),
        email: email.toLowerCase(),
        password: hashedPassword
    })
    User.findOne({ email: email.toLowerCase() }, async (err, foundUser) => {
        if (err) console.log(err)
        if (foundUser) res.send("User Already Exists")
        else {
            await newUser.save()
            res.redirect('/Login')
        }
    })
})

app.post("/login", (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) res.send(err)
        else {
            req.login(user, (err) => {  // passport.js method
                if (err) throw (err)
                res.redirect("/loggedUser")
            })
        }
    })(req, res)
})

app.get("/logout", (req, res) => {
    if (req.isAuthenticated() !== true) res.redirect("/")
    else {
        req.logout((err) => {
            if (err) console.log(err)
            else res.redirect("/")
        })
    }
})

app.get('/user', (req, res) => {
    res.send(req.user)
})

app.post('/user/delete', (req, res) => {
    if (req.body.joke !== undefined) {
        // handle the request for a single part joke:
        req.user.jokes = req.user.jokes.filter(joke => joke.joke !== req.body.joke)
        req.user.save()
    } else {
        // handle the request for a two part joke:
        req.user.jokes = req.user.jokes.filter(joke => joke.setup !== req.body.setup)
        req.user.save()
    }
})

app.post('/like', (req, res) => {
    if (req.user) {
        const { category, type, joke, setup, delivery } = req.body
        const newJoke = joke !== undefined ?
            new Joke({
                category: category,
                type: type,
                joke: joke
            }) :
            new TwoPartJoke({
                category: category,
                type: type,
                setup: setup,
                delivery: delivery
            })
        req.user.jokes.push(newJoke)
        req.user.save()
    } else {
        console.error("Failed to find the correct user..")
    }
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }))

// redirect from google login:
app.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }), // redirect to "/login" if not successful
    function (req, res) {
        // Successful authentication, redirect to "secrets".
        res.redirect('/loggedUser')
    })

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }))

app.get('/auth/facebook/redirect',
    passport.authenticate('facebook', { failureRedirect: '/login' }), // redirect to "/login" if not successful
    function (req, res) {
        // Successful authentication, redirect to "secrets".
        res.redirect('/loggedUser')
    })
//? -------------------------------- End Of Routes: --------------------------------

//? ----------------------------- While in production: -----------------------------
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename).slice(0, -7)

app.use(express.static(path.join(__dirname, '/frontend/build')))
// '*' - any route that is not declared in the api routes
// console.log(__dirname)
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
//? ----------------------------- End - While in production: -----------------------------


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})