"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_controller_1 = require("../controllers/game.controller");
const gameRouter = express_1.default.Router();
gameRouter.route('/getWord').get((req, res) => new game_controller_1.GameController().getWord(req, res));
gameRouter.route('/getWord2').post((req, res) => new game_controller_1.GameController().getWord2(req, res));
gameRouter.route('/updateHits').post((req, res) => new game_controller_1.GameController().updateHits(req, res));
gameRouter.route('/getHits').post((req, res) => new game_controller_1.GameController().getHits(req, res));
exports.default = gameRouter;
