import * as express from 'express';
import Question from '../models/Question';
import User from '../models/user';


export class KvizController {
    getQuestion = (req: express.Request, res: express.Response) => {
        let city = req.body.city;
        let qtype = req.body.qtype;
        console.log(city);
        console.log(qtype);
        // let id = Math.floor(Math.random() * 4) + 1;
        Question.find({ 'city': city, 'type': qtype }).then((questions) => {
            console.log(questions);
            res.json(questions);
        }).catch((err) => {
            console.log(err);
        })
    }

    getQuestionById = (req: express.Request, res: express.Response) => {
        console.log("ID quest")
        let id = req.body.id;
        Question.findOne({ 'id': id }, (err, question) => {
            if (err) console.log(err);
            else res.json(question);
        })
    }

    saveScore = (req: express.Request, res: express.Response) => {
        console.log("saving score")
        let username = req.body.username;
        let points = req.body.points;
        User.findOneAndUpdate({ 'username': username },  { $inc: { points: points } } )
            .then((user) => {
            res.json({'message': 'ok'})
            }).catch((err) => {
            console.log(err);
            res.json({'message': 'err'})
        })
    }


}