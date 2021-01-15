const express = require('express');
const cors = require('cors');
const tutors = express.Router();
const app = express();

//import model
const TutorModel = require('../models/Tutor');

//Use headers to give browser access to resources
tutors.use(cors());
tutors.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

tutors.post('/newTutor', (req, res) => {

    TutorModel.create({
        user: req.body.user,
        subject: req.body.subject,
        rate: req.body.rate,
        description: req.body.description
    });
})

tutors.get('/getTutors', (req, res) => {

    TutorModel.find((error, data) => {
        res.json({
            tutors: data
        });
    })
})

module.exports = tutors;