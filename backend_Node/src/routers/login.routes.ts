import express from 'express'
import { UserController } from '../controllers/user.controller';


const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)
userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/connestions').post(
    (req, res) => new UserController().connections(req, res)
)

userRouter.route('/myconnections').post(
    (req, res) => new UserController().myconnections(req, res)
)

userRouter.route('/allMyConnections').post(
    (req, res) => new UserController().allMyConnections(req, res)
)

userRouter.route('/connect').post(
    (req, res) => new UserController().connect(req, res)
)

userRouter.route('/updateCurrentCity').post(
    (req, res) => new UserController().updateCurrentCity(req, res)
)
userRouter.route('/allMyConnections').post(
    (req, res) => new UserController().allMyConnections(req, res)
)

userRouter.route('/posaljiporuku').post(
    (req, res) => new UserController().posaljiPoruku(req, res)
)

userRouter.route('/poruke').post(
    (req, res) => new UserController().poruke(req, res)
)

userRouter.route('/rate').post(
    (req, res) => new UserController().rate(req, res)
)

userRouter.route('/myrate').post(
    (req, res) => new UserController().myRate(req, res)
)


export default userRouter;