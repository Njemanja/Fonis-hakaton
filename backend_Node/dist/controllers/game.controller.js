"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const Game_words_1 = __importDefault(require("../models/Game_words"));
const Hit_1 = __importDefault(require("../models/Hit"));
const console_1 = require("console");
class GameController {
    constructor() {
        this.getWord = (req, res) => {
            let id = Math.floor(Math.random() * 20) + 1;
            Game_words_1.default.findOne({ 'id': id }).then((word) => {
                res.json(word);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getHits = (req, res) => {
            console.log(req.body.username);
            Hit_1.default.find({ 'username': req.body.username }).then((word) => {
                console.log(word);
                res.json(word);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getWord2 = (req, res) => {
            let city = req.body.city;
            console.log(city);
            // let id = Math.floor(Math.random() * 4) + 1;
            Game_words_1.default.find({ 'city': city }).then((words) => {
                console.log(words);
                res.json(words);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.updateHits = (req, res) => {
            let hits = req.body.hits;
            console.log("updating hits");
            for (let i = 0; i < hits.length; i++) {
                let hit = new Hit_1.default(hits[i]);
                ////////
                Hit_1.default.findOne({ 'username': hit.username, 'hit_word': hit.hit_word })
                    .then(oldhit => {
                    if (oldhit) {
                        if (i == hits.length - 1) {
                            (0, console_1.log)("Completed");
                            res.status(200).json({ 'message': '0' });
                        }
                    }
                    else {
                        hit.save().then(() => {
                            if (i == hits.length - 1) {
                                (0, console_1.log)("Completed");
                                res.status(200).json({ 'message': '0' });
                            }
                            //   res.status(200).json({'message': '0'});
                        }).catch((err) => {
                            (0, console_1.log)("Error saving user:", err);
                            //    res.status(400).json({'message': '-1'});
                        });
                    }
                });
            }
        };
    }
}
exports.GameController = GameController;
