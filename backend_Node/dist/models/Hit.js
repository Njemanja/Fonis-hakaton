"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Hit = new Schema({
    username: {
        type: String
    },
    id: {
        type: Number
    },
    hit_word: {
        type: String
    },
    language: {
        type: String
    },
    question: {
        type: String
    },
});
exports.default = mongoose_1.default.model('Hit', Hit, 'hit');
