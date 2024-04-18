import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Messages = new Schema({
    username1: {
        type: String
    },
    username2: {
        type: String
    },
    messages: {
        type: Array
    },
    photo1: {
        type: String
    },
    photo2: {
        type: String
    },
})

export default mongoose.model('Messages', Messages, 'messages');