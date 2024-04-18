import * as express from 'express';
import Game_words from '../models/Game_words';
import Hit from '../models/Hit';
import { log } from 'console';


export class GameController {
    getWord = (req: express.Request, res: express.Response) => {
        let id = Math.floor(Math.random() * 20) + 1;
        Game_words.findOne({ 'id': id }).then((word) => {
            res.json(word);    
        
        }).catch((err)=>{
            console.log(err);
        })
    }
    getHits = (req: express.Request, res: express.Response) => {
        console.log( req.body.username);
        Hit.find({ 'username': req.body.username }).then((word) => {
            console.log(word)
            res.json(word);    
        
        }).catch((err)=>{
            console.log(err);
        })
    }

    getWord2 = (req: express.Request, res: express.Response) => {
        let city = req.body.city;
        console.log(city);
        // let id = Math.floor(Math.random() * 4) + 1;
        Game_words.find({ 'city': city}).then((words) => {
            console.log(words);
            res.json(words);
        }).catch((err) => {
            console.log(err);
        })
    }

    updateHits = (req: express.Request, res: express.Response) => {
        let hits = req.body.hits;
        console.log("updating hits");
        for(let i = 0;  i<hits.length;i++){
            let hit = new Hit(hits[i]);
            
            ////////
            Hit.findOne({'username': hit.username, 'hit_word': hit.hit_word})
            .then(oldhit => {
                if(oldhit) {
                    if(i == hits.length - 1){
                        log("Completed");
                        res.status(200).json({'message': '0'});
                    }
                }
                else{
                    hit.save().then(() => {
                        if(i == hits.length - 1){
                            log("Completed");
                            res.status(200).json({'message': '0'});
                        }
                            //   res.status(200).json({'message': '0'});
                        }).catch((err) => {
                        log("Error saving user:", err);
                            //    res.status(400).json({'message': '-1'});
                    });
                }})
        }
    }
}