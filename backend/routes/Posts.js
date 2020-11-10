const express = require('express');
const cors = require('cors');
const posts = express.Router();
const app = express();

//import model
const PostModel = require('../models/Post');

//Use headers to give browser access to resources
posts.use(cors());
posts.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

posts.post('/NewPosts', (req, res) => {

    PostModel.create({
        user: req.body.user,
        post: req.body.post,
        time: req.body.time,
        category: req.body.category,
        tags:req.body.tags
      
    });
})



posts.get('/getPosts', (req, res) => {

    PostModel.find((error, data) =>{
        res.json({posts:data});
        //console.log(data);
    })

})

module.exports = posts;