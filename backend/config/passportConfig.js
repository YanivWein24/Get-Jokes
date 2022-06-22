import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
import userSchema from "./userSchema.js";
import mongoose from 'mongoose'


const passportConfig = (passport) => {
    const User = mongoose.model('User', userSchema);

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email'
            },
            (email, password, done) => {
                User.findOne({ email: email.toLowerCase() }, (err, user) => {
                    if (err) throw err
                    const errorMessage = "There is no user data associated with the provided email address."
                    if (!user) return done(errorMessage, false) // null for errors, false for returned user
                    const isPasswordValid = bcrypt.compare(password, user.password)
                        .then((res) => {
                            console.log("Comparison was: " + res)
                            if (res === true) {
                                console.log(res, "sending user data")
                                return done(null, user) // null for errors, user for the returned user
                            } else return done("Password is incorrect", null)
                        })
                })
            })
    )


    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

export default passportConfig