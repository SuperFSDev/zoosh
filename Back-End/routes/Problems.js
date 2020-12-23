const express = require('express');
const app = express();
const cors = require('cors');
const problems = express.Router();

//import model
const ProblemModel = require('../models/Problem');

//Use headers to give browser access to resources
problems.use(cors());
problems.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

problems.get('/problems', (req, res) => {

    ProblemModel.find((error, data) =>{
        res.json({problems:data});
        //console.log(data);
    })

})

module.exports = problems;