const express = require('express');
const cors = require('cors');
const discussions = express.Router();
const app = express();

//import model
const DiscussionmModel = require('../models/Discussion');

//Use headers to give browser access to resources
discussions.use(cors());
discussions.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

discussions.post('/NewDiscussions', (req, res) => {

    DiscussionmModel.create({
        user: req.body.user,
        title: req.body.title,
        post: req.body.post,
        time: req.body.time,
        category: req.body.category,
        tags:req.body.tags
      
    });
})



discussions.get('/getDiscussions', (req, res) => {

    DiscussionmModel.find((error, data) =>{
        res.json({discussions:data});
    })

})

module.exports = discussions;