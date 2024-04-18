import mongoose from "mongoose";
import Game_words
    from "./Game_words";
const Schema = mongoose.Schema;

let Rates = new Schema({
    username: {
        type: String
    },
    rate: {
        type: Number

    },
    who: {
        type: String
    },

})

export default mongoose.model('Rates', Rates, 'rates');