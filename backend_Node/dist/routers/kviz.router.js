"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kviz_controller_1 = require("../controllers/kviz.controller");
const kvizRouter = express_1.default.Router();
kvizRouter.route('/getQuestion').post((req, res) => new kviz_controller_1.KvizController().getQuestion(req, res));
kvizRouter.route('/getQuestionById').post((req, res) => new kviz_controller_1.KvizController().getQuestionById(req, res));
kvizRouter.route('/saveScore').post((req, res) => new kviz_controller_1.KvizController().saveScore(req, res));
kvizRouter.route('/saveScore2').post((req, res) => new kviz_controller_1.KvizController().saveScore(req, res));
exports.default = kvizRouter;
