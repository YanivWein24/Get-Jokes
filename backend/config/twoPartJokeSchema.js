import mongoose from "mongoose"

const twoPartJokeSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    setup: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    }
})

export default twoPartJokeSchema