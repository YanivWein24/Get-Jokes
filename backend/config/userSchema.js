import mongoose from "mongoose"
import findOrCreate from 'mongoose-findorcreate'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        // required: true
    },
    jokes: {
        type: Array,
        required: false,
        default: []
    },
    googleID: {
        type: String,
        required: false
    },
    facebookID: {
        type: String,
        required: false
    }
})

userSchema.plugin(findOrCreate) //enables userSchema to use the 'findOrCreate' method

export default userSchema