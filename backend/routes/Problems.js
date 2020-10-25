const express = require('express');
const cors = require('cors');
const problems = express.Router();

//import model
const ProblemModel = require('../models/Problem');

//Use headers to give browser access to resources
users.use(cors());
users.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api/problems', (req, res) => {

    ProblemModel.find((error, data) =>{
        res.json({problems:data});
        console.log(data);
    })

})