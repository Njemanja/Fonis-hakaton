"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const console_1 = require("console");
const MyConnections_1 = __importDefault(require("../models/MyConnections"));
const Poruka_1 = __importDefault(require("../models/Poruka"));
const Rates_1 = __importDefault(require("../models/Rates"));
let id = 0;
let idDog = 0;
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password })
                .then(user => {
                if (user)
                    res.json(user);
                else {
                    res.json(null);
                }
            })
                .catch(err => {
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username })
                .then(user => {
                if (user)
                    res.json({ 'message': 'User with this username exists.' });
                else {
                    (0, console_1.log)("OK");
                    user_1.default.findOne({ 'email': req.body.email })
                        .then(user => {
                        if (user)
                            res.json({ 'message': 'User with this email exists.' });
                        else {
                            (0, console_1.log)("OK");
                            let user = new user_1.default({
                                username: req.body.username,
                                name: req.body.name,
                                surname: req.body.surname,
                                password: req.body.password,
                                email: req.body.email,
                                telephone: req.body.telephone,
                                country: req.body.country,
                                city: req.body.city,
                                rate: 0,
                                visitedCities: [],
                                visitedCountries: [],
                                points: 0,
                                age: req.body.age,
                                type: req.body.type,
                                languages: req.body.languages,
                                currentCity: null
                            });
                            (0, console_1.log)(user);
                            user.save()
                                .then(() => {
                                (0, console_1.log)("User successfully saved.");
                                res.status(200).json({ 'message': '0' });
                            })
                                .catch((err) => {
                                (0, console_1.log)("Error saving user:", err);
                                res.status(400).json({ 'message': '-1' });
                            });
                        }
                    })
                        .catch(err => {
                    });
                }
            })
                .catch(err => {
            });
        };
        this.connections = (req, res) => {
            let city = req.body.city;
            let languages = req.body.languages;
            let users1 = [];
            user_1.default.find({
                'city': city
            })
                .then((users) => {
                if (users.length > 0) {
                    for (let i = 0; i < users.length; i++) {
                        const hasCommonElement = languages.some(item => users[i].languages.includes(item));
                        if (hasCommonElement) {
                            users1.push(users[i]);
                        }
                    }
                    console.log("Added: " + users1);
                    res.json(users1);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.myconnections = (req, res) => {
            let username1 = req.body.username1;
            let username2 = req.body.username2;
            let connected = [];
            MyConnections_1.default.find({})
                .then((conn) => {
                if (conn.length > 0) {
                    for (let i = 0; i < conn.length; i++) {
                        if (conn[i].users.includes(username1) && conn[i].users.includes(username2)) {
                            connected.push(conn[i]);
                        }
                    }
                    res.json(connected);
                }
                else {
                    res.json(null);
                }
            });
        };
        this.connect = (req, res) => {
            let username1 = req.body.username;
            let username2 = req.body.username2;
            console.log(username1);
            console.log(username2);
            MyConnections_1.default.find({ $and: [{ users: username1 }, { users: username2 }] })
                .then((conn) => {
                if (conn.length > 0) {
                    console.log(conn[0]);
                    conn[0].conneceted = 2;
                    conn[0].save();
                    const data1 = new Poruka_1.default({
                        poruke: [{
                                "datum": "2023-01-23T22:45:20.203Z",
                                "from": username1,
                                "poruka": "Hey."
                            }],
                        korisnickoIme1: username1,
                        korisnickoIme2: req.body.username2,
                        slika1: "data:image/jpeg;base64,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",
                        slika2: "data:image/jpeg;base64,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",
                    });
                    console.log(data1);
                    // Sačuvati novi dokument
                    data1.save().then(() => {
                        res.json("Nova poruka sačuvana.");
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom čuvanja nove poruke.' });
                    });
                }
                else {
                    let connection = new MyConnections_1.default({
                        users: [username1, username2],
                        conneceted: 1
                    });
                    console.log(connection);
                    connection.save();
                }
            });
        };
        this.allMyConnections = (req, res) => {
            let username = req.body.username;
            console.log(username);
            MyConnections_1.default.find({ users: { $in: username } })
                .then((connections) => {
                res.json(connections);
            });
        };
        this.updateCurrentCity = (req, res) => {
            console.log("updating city");
            let username = req.body.username;
            let currentCity = req.body.currentCity;
            user_1.default.findOneAndUpdate({ 'username': username }, { 'currentCity': currentCity })
                .then((user) => {
                res.json({ 'message': 'ok' });
            }).catch((err) => {
                console.log(err);
                res.json({ 'message': 'err' });
            });
        };
        this.poruke = (req, res) => {
            const korisnickoIme = req.body.korisnickoIme;
            console.log(korisnickoIme);
            Poruka_1.default.find({ $or: [{ 'korisnickoIme1': korisnickoIme }, { 'korisnickoIme2': korisnickoIme }] })
                .then((data) => {
                if (data) {
                    res.json(data);
                }
                else {
                    console.log([]);
                    res.json([]);
                }
            })
                .catch((err) => {
                console.error('Greška prilikom pretrage poruka:', err);
                res.status(500).json({ error: 'Greška prilikom pretrage poruka' });
            });
        };
        this.posaljiPoruku = (req, res) => {
            let korisnickoIme = req.body.username;
            let korisnickoIme1 = req.body.username1;
            Poruka_1.default.findOne({
                $or: [
                    { $and: [{ "korisnickoIme1": korisnickoIme }, { "korisnickoIme2": korisnickoIme1 }] },
                    { $and: [{ "korisnickoIme1": korisnickoIme1 }, { "korisnickoIme2": korisnickoIme }] }
                ]
            }).then((data) => {
                if (data) {
                    console.log("Stara poruka:");
                    console.log(req.body.novaPoruka);
                    data.poruke.push(req.body.novaPoruka);
                    console.log(data);
                    const data1 = new Poruka_1.default({
                        poruke: data.poruke,
                        korisnickoIme1: data.korisnickoIme1,
                        korisnickoIme2: data.korisnickoIme2,
                        slika1: data.slika1,
                        slika2: data.slika2
                    });
                    console.log(data1);
                    data1.save().then(() => {
                        console.log("Poruka poslata.");
                        res.json("Poruka poslata.");
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom čuvanja nove poruke.' });
                    });
                    Poruka_1.default.deleteOne({ _id: data._id }).then(() => {
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom brisanja postojeće poruke.' });
                    });
                }
                else {
                    const data1 = new Poruka_1.default({
                        poruke: [req.body.novaPoruka],
                        korisnickoIme1: req.body.korisnickoIme1,
                        korisnickoIme2: req.body.korisnickoIme2,
                    });
                    // Sačuvati novi dokument
                    data1.save().then(() => {
                        res.json("Nova poruka sačuvana.");
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: 'Došlo je do greške prilikom čuvanja nove poruke.' });
                    });
                }
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Došlo je do greške prilikom pretrage poruka.' });
            });
        };
        this.rate = (req, res) => {
            const username = req.body.username;
            const username1 = req.body.username1;
            const rate = req.body.rate;
            Rates_1.default.findOneAndUpdate({ $and: [{ 'username': username }, { 'who': username1 }] }, { $set: { rate: rate } }, { new: true, upsert: true } // Opciono: ako želite da kreirate novu ocenu ako ne postoji
            )
                .then((updatedRate) => {
                res.json("Ocena ažurirana.");
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Došlo je do greške prilikom ažuriranja ocene.' });
            });
        };
        this.myRate = (req, res) => {
            const username = req.body.username;
            Rates_1.default.find({ $and: [{ 'username': username }] })
                .then((updatedRate) => {
                var rate = 0;
                var count = 0;
                updatedRate.forEach(element => {
                    rate += element.rate;
                    count++;
                });
                res.json({
                    rate: rate, count: count
                });
            })
                .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Došlo je do greške prilikom ažuriranja ocene.' });
            });
        };
    }
}
exports.UserController = UserController;
