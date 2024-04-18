"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Game_words', Game_words, 'game_words');
