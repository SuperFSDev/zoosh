const express = require('express');
const cors = require('cors');
const posts = express.Router();
const app = express();

//import model
const ProblemModel = require('../models/Problem');

//Use headers to give browser access to resources
posts.use(cors());
posts.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

posts.get('/problems', (req, res) => {

    ProblemModel.find((error, data) =>{
        res.json({problems:data});
        console.log(data);
    })

})

module.exports = posts;