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
                User.findOne({ email: email }, (err, user) => {
                    if (err) throw err
                    if (!user) return done("No user found", false) // null for errors, false for returned user
                    const isPasswordValid = bcrypt.compare(password, user.password)
                    if (!isPasswordValid) return done("Email or password are not valid", null)
                    return done(null, user) // null for errors, user for the returned user
                })
                // bcrypt.compare(password, user.password, (err, result) => {
                //     if (err) throw err
                //     if (result === true) {
                //         return done(null, user) // null for errors, user for the returned user
                //     } else {
                //         return done(null, false)
                //     }
                // })
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