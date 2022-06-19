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
    res.send("API Is Running...");
});


app.post('/Register', (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) { console.log(err) }
        else {
            console.log("Added new user!")
            res.redirect("/")
        }
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});