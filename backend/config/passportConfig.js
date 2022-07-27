import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
import userSchema from "./userSchema.js"
import mongoose from 'mongoose'


const passportConfig = (passport) => {
    const User = mongoose.model('User', userSchema)

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
                    bcrypt.compare(password, user.password)
                        .then((res) => {
                            if (res === true) {
                                return done(null, user) // null for errors, user for the returned user
                            } else return done("Password is incorrect", null)
                        })
                })
            })
    )


    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(async function (user, done) {
        try {
            const account = await User.findOne({ email: user.email })
            done(null, account)
        } catch (error) {
            done(error, null)
        }
    })
}

export default passportConfig