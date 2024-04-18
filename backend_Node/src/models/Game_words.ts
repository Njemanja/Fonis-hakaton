import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Game_words = new Schema({
    id: {
        type: Number
    },
    question_word: {
        type: String
    },
    right: {
        type: String
    },
    wrong: {
        type: String
    },
    city: {
        type: String
    },
})

export default mongoose.model('Game_words', Game_words, 'game_words');