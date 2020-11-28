const express = require('express');
const cors = require('cors');
const comments = express.Router();
const app = express();

//import model
const CommentModel = require('../models/Comment');

//Use headers to give browser access to resources
comments.use(cors());
comments.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

comments.post('/AddComment', (req, res) => {

    CommentModel.create({
        user: req.body.user,
        user_id:req.body.user_id,
        post_id:req.body.post_id,
        comment: req.body.comment,
        time: req.body.time,
      
    });
})



comments.get('/getComments', (req, res) => {

    CommentModel.find((error, data) =>{
        res.json({comments:data});
        //console.log(data);
    })

})

module.exports = comments;