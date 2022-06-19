import dotenv from 'dotenv';
import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import userSchema from './config/userSchema.js'

dotenv.config();

connectDB()
const User = mongoose.model('User', userSchema);

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send('API is running...');
});

app.get('/api/user', function (req, res) {
    User.findById(req.user._id, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                res.render("User", { User: foundUser })
            }
        }
    });
});

app.post('/Register', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (User.findOne({ email: req.body.email })) {
            res.send("This Email is already registered!");
        } else if (err) {
            console.log(err)
            res.redirect("/Register")
        }
        else {
            console.log("Added new user!")
            console.log(req.body.email)
            console.log(req.body.password)
            res.redirect("/User")
        }
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});