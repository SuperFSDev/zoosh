const express = require('express');
const cors = require('cors');
const links = express.Router();
const app = express();

//import model
const LinkModel = require('../models/Link');

//Use headers to give browser access to resources
links.use(cors());
links.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

links.post('/NewLink', (req, res) => {

    LinkModel.create({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        time: req.body.time,
    });
})

links.get('/getLinks', (req, res) => {

    LinkModel.find((error, data) => {
        res.json({
            links: data
        });
    })
})

module.exports = links;