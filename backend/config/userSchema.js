import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    jokes: {
        type: Array,
        required: false,
        default: []
    }
})

export default userSchema