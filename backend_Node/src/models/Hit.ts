import mongoose from "mongoose";
import Game_words
 from "./Game_words";
const Schema = mongoose.Schema;

let Hit = new Schema({
    username: {
        type: String
    },
    id: {
        type: Number
    },
    hit_word:{
        type: String
    },
    language:{
        type: String
    },
    question: {
        type: String
    },
    
})

export default mongoose.model('Hit', Hit, 'hit');