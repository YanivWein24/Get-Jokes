import dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import _ from 'lodash' // enables _.capitalize()
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import path from 'path';
import { fileURLToPath } from 'url';
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

//? -------------------------------- End Of Middleware: --------------------------------

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
// app.get('/', (req, res) => res.send('API is running...'))

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
                res.redirect("/user")
            })
        }
    })(req, res)
})

app.get("/Logout", (req, res) => {
    if (req.isAuthenticated() !== true) res.redirect("/")
    else {
        req.logout((err) => {
            console.log("User requesting to log out")
            if (err) console.log(err)
            else res.redirect("/")
        })
    }
})

// app.get('/User', (req, res) => {
//     if (!req.isAuthenticated()) {
//         res.redirect('/Login')
//     }
// })

app.get('/User', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user)
    } else {
        res.redirect('/Login')
    }
})

app.post('/user/delete', (req, res) => {
    console.log("Received request to delete joke")
    req.body.joke ?
        // handle the request for a single part joke:
        User.findOneAndUpdate({ email: req.user.email }, { $pull: { jokes: { joke: req.body.joke } } }, function (err, foundList, item) {
            // we use the $pull method to remove items from an array in our collection
            if (!err) console.log(`Deleted joke from ${req.user.firstName} ${req.user.lastName}'s collection`)
            else console.log(err)
        })
        :
        // handle the request for a two part joke:
        User.findOneAndUpdate({ email: req.user.email }, { $pull: { jokes: { setup: req.body.setup } } }, function (err, foundList, item) {
            // we use the $pull method to remove items from an array in our collection
            if (err) console.log(err)
            else {
                console.log(`Deleted joke from ${req.user.firstName} ${req.user.lastName}'s collection`)
                res.sendStatus(200)
            }
        })
})

app.post('/Like', (req, res) => {
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
    User.findOne({ email: req.user.email }, (err, foundUser) => {
        if (foundUser) {
            foundUser.jokes.push(newJoke)
            foundUser.save()
                .then(console.log(`Added new joke to ${req.user.firstName} ${req.user.lastName}'s collection`))
        } else {
            console.log("Failed to find the correct user..")
        }
    })
})


// When in production:
const __filename = fileURLToPath(import.meta.url);

// 👇️ "C:\Users\yaniv\Desktop\programming\javascript\react\Get Jokes\"
const __dirname = path.dirname(__filename + '\..').slice(0, -7)

app.use(express.static(path.join(__dirname, '/frontend/build')))
// '*' - any route that is not declared in the api routes
console.log(__dirname)
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))

//? -------------------------------- End Of Routes: --------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});