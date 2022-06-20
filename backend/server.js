import dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import connectDB from './config/db.js'
import userSchema from './config/userSchema.js'
import passportConfig from './config/passportConfig.js'

dotenv.config();
passportLocal.Strategy

connectDB()

const app = express();

//? Middleware:
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting
    credentials: true
}))

app.use(session({    //? using express-session
    secret: 'A long string which is the secret key.', // just set as a long string
    resave: false, // default
    saveUninitialized: true,  // default
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // equals to 1 day
    }
}));

app.use(cookieParser('A long string which is the secret key.'));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport)

app.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
})

// userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

// passport.use(User.createStrategy());

//? Routes:
app.get('/', function (req, res) {
    res.send('API is running...');
});

app.get('/user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send(req.user)
    } else {
        res.redirect('/Login')
    }
});

// app.get('/api/:user', function (req, res) {
//     User.findById(req.user._id, (err, foundUser) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (foundUser) {
//                 res.render("User", { User: foundUser })
//             }
//         }
//     });
// });

app.post('/Register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    console.log("Data from registration form:", firstName, lastName, email, password)
    const hashedPassword = await bcrypt.hash(password, 15) // 15 salting rounds
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    });
    User.findOne({ email: email }, async (err, foundUser) => {
        if (err) throw err
        if (foundUser) res.send("User Already Exists")
        else {
            await newUser.save()
            console.log("User Added Successfully!")
            res.redirect('/Login')
        }
    })
    // const { email, password } = req.body
    // res.send(req.body.password);

    // const newUser = new User({
    //     email: email,
    //     password: password
    // });
    // newUser.save((err) => {
    //     if (User.findOne({ email: email })) {
    //         // res.send("This Email is already registered!");
    //         console.log(User.findOne({ email: email }))
    //     }
    //     else if (err) {
    //         console.log(err)
    //         res.redirect("/Register")
    //     }
    //     else {
    //         console.log("Added new user!")
    //         console.log(email)
    //         console.log(password)
    //         res.redirect("/User")
    //     }
    // })

    // User.register({ email: req.body.email, username: req.body.email, password: req.body.password }, function (err, user) {
    //     if (err) {
    //         console.log(err)
    //         console.log(req.body.email)
    //         console.log(req.body.password)
    //         res.redirect("/Register")
    //     }
    //     else {
    //         console.log("Added new user!")
    //         console.log(req.body.email)
    //         console.log(req.body.password)
    //         passport.authenticate("local")(req, res, function () {
    //             res.redirect("/User")
    //         });
    //     }
    // })
})

app.post("/login", function (req, res) {
    console.log("Test")
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // });
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log(err)
            res.redirect("/")
        }
        // else if (!user) res.send("User Not Found")
        else {
            req.login(user, (err) => {  // passport.js method
                if (err) {
                    console.log(err)
                    res.redirect("/")
                }
                console.log('successfully logged in!')
                console.log(req.user)
                res.redirect("/User")
            })
        }
    })(req, res)
})

// app.get('/Logout', function (req, res) {
//     console.log(req.user)
//     req.session.destroy(function (err) {
//         res.redirect('/')
//     })
// })

app.get("/Logout", function (req, res) {
    req.logout();  // passport.js method
    res.redirect("/");
});

// app.post('/Login', passport.authenticate('local', { failureRedirect: '/' }))

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});