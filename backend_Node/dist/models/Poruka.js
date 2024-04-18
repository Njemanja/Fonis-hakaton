"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Poruka = new Schema({
    korisnickoIme1: {
        type: String
    },
    korisnickoIme2: {
        type: String
    },
    slika1: {
        type: String
    },
    slika2: {
        type: String
    },
    poruke: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Poruka', Poruka, 'poruka');
