import mongoose from "mongoose"

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
        required: true
    },
    jokes: {
        type: Array,
        required: false,
        default: [{ category: "joke1", joke: "haha" }, { category: "joke2", joke: "hahaha" }]
    }
})

export default userSchema