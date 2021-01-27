const express = require('express');
const cors = require('cors');
const questions = express.Router();
const app = express();

//import model
const QuestionModel = require('../models/Question');

//Use headers to give browser access to resources
questions.use(cors());
questions.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

questions.post('/NewQuestion', (req, res) => {

    console.log(req.body);

    QuestionModel.create({
        user: req.body.user,
        user_id: req.body.user_id,
        question: req.body.question,
        time: req.body.time,
        society: req.body.society.value,
    });
})

questions.get('/getQuestions', (req, res) => {

    QuestionModel.find((error, data) => {
        res.json({
            questions: data
        });
    })
})

questions.get('/get-questions-page', (req, res) => {

    QuestionModel.findById({
            _id: req.query.id
        }).then(question => {
            if (question) {
                res.json({
                    question: question
                });
            } else {
                res.send("Question does not exist")
            }
        })
        .catch(err => {
            res.send(err)
        })
})

questions.get('/get-society-questions', (req, res) => {

    QuestionModel.find({
            society: req.query.society
        }).then(question => {
            if (question) {
                res.json({
                    question: question
                });
            } else {
                res.send("Question does not exist")
            }
        })
        .catch(err => {
            res.send(err)
            console.log(err);
        })
})


module.exports = questions;