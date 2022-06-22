import dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import _ from 'lodash' // enables _.capitalize()
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import connectDB from './config/db.js'
import userSchema from './config/userSchema.js'
import jokeSchema from './config/jokeSchema.js'
import twoPartJokeSchema from './config/twoPartJokeSchema.js'
import passportConfig from './config/passportConfig.js'

dotenv.config();
passportLocal.Strategy

connectDB()

const app = express();

//? ----------------------------------- Middleware: -----------------------------------
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({    //? using express-session
    secret: 'A long string which is the secret key.', // just set as a long string
    resave: false, // default
    saveUninitialized: true,  // default
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // equals to 1 day
    }
}));

app.use(express.json()) // needed to allow the server accept data from axios requests
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport)
//? -------------------------------- end of Middleware: --------------------------------

//? Use this to check out updates in the session:
// app.use((req, res, next) => {
// console.log(req.session.passport)
// console.log(req.user)
// next()
// })


//? creating the User model with userSchema
const User = mongoose.model('User', userSchema);
const Joke = mongoose.model('Joke', jokeSchema);
const TwoPartJoke = mongoose.model('TwoPartJoke', twoPartJokeSchema);


//? ----------------------------------- Routes: -----------------------------------

app.get('/', (req, res) => res.send('API is running...'))

app.post('/Register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log("Data from registration form:", firstName, lastName, email, password)
    const hashedPassword = await bcrypt.hash(password, 10) // 10 salting rounds
    const newUser = new User({
        firstName: _.capitalize(firstName),
        lastName: _.capitalize(lastName),
        email: email.toLowerCase(),
        password: hashedPassword
    });
    User.findOne({ email: email.toLowerCase() }, async (err, foundUser) => {
        if (err) console.log(err)
        if (foundUser) res.send("User Already Exists")
        else {
            await newUser.save()
            console.log("User Added Successfully!")
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
                console.log('successfully logged in!')
                res.redirect("/User")
            })
        }
    })(req, res)
})

app.get("/Logout", (req, res) => {
    if (req.isAuthenticated() !== true) res.redirect("/")
    else {
        req.logout((err) => {
            if (err) console.log(err)
            else res.redirect("/")
        })
    }
})

app.get('/User', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user)
    } else {
        res.redirect('/Login')
    }
})

app.post('/user/delete', (req, res) => {
    console.log("Received request to delete joke")
    console.log(req.body)
    User.findOneAndUpdate({ email: req.user.email }, { $pull: { jokes: { _id: '62b30c898a2b4cd67554a67f' } } }, function (err, foundList, item) {
        // we use the $pull method to remove items from an array in our collection
        if (!err) console.log(`Deleted joke from ${req.user.firstName} ${req.user.lastName}'s collection`)
        else console.log(err)
    })
})

app.post('/Like', (req, res) => {
    console.log(req.body)
    const newJoke = req.body.joke !== undefined ?
        new Joke({
            category: req.body.category,
            type: req.body.type,
            joke: req.body.joke
        }) :
        new TwoPartJoke({
            category: req.body.category,
            type: req.body.type,
            setup: req.body.setup,
            delivery: req.body.delivery
        })
    User.findOne({ email: req.user.email }, (err, foundUser) => {
        if (foundUser) {
            foundUser.jokes.push(newJoke)
            foundUser.save((err) => {
                if (err) console.log(err)
                else {
                    const { firstName, lastName } = req.user
                    console.log(`Added new joke to ${firstName} ${lastName}'s collection !`)
                }
            })
        } else {
            console.log("Failed to find the correct user..")
        }
    })
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});