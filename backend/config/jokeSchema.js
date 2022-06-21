import mongoose from "mongoose"

const jokeSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    joke: {
        type: String,
        required: true
    }
})

export default jokeSchema