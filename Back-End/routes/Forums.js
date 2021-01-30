const express = require('express');
const cors = require('cors');
const forums = express.Router();
const app = express();
//import model
const ForumModel = require('../models/Forum');
const ForumModelBug = require('../models/Forum');

//Use headers to give browser access to resources
forums.use(cors());
forums.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

forums.post('/NewPost', (req, res) => {

    console.log(req.body);

    ForumModel.create({
        user: req.body.user,
        user_id: req.body.user_id,
        post: req.body.post,
        time: req.body.time,
        tag: req.body.tag,
    });
})

forums.get('/getForumPosts', (req, res) => {

    ForumModel.find((error, data) => {
        res.json({
            forums: data
        });
    })
})


module.exports = forums;