import express from 'express';
import { GameController } from '../controllers/game.controller';

const gameRouter = express.Router();

gameRouter.route('/getWord').get(
    (req, res)=>new GameController().getWord(req, res)
)
gameRouter.route('/getWord2').post(
    (req, res)=>new GameController().getWord2(req, res)
)
gameRouter.route('/updateHits').post(
    (req, res)=>new GameController().updateHits(req, res)
)

gameRouter.route('/getHits').post(
    (req, res)=>new GameController().getHits(req, res)
)

export default gameRouter;