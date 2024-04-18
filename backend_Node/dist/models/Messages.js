"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Messages', Messages, 'messages');
