const express = require('express');
const cors = require('cors');
const forums = express.Router();
const app = express();
//import model
const ForumModel = require('../models/Forum');

//Use headers to give browser access to resources
forums.use(cors());
forums.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


forums.get('/getForums', (req, res) => {

    ForumModel.find((error, data) => {
        res.json({
            forums: data
        });
    })
})


forums.get('/get-forum-page', (req, res) => {

    ForumModel.findById({
            _id: req.query.id
        }).then(forum => {
            if (forum) {
                res.json({
                    forum: forum
                });
            } else {
                res.send("forum does not exist")
            }
        })
        .catch(err => {
            res.send(err)
        })

})


forums.post('/addForumPost', (req, res) => {


})


forums.post('/updateForumFollowers', (req, res) => {
    
    ForumModel.findOneAndUpdate(
        { name: req.body.forum, },
        { $addToSet: { followers: req.body.follower } },
        { upsert: true, new: true, runValidators: true },

        function (err, result) {

            if (err) {
                res.send(err)   
            }
            else {
                if(result){
                    res.send(result)
                } else {
                    res.send("User already exists");
                }
            }

        }
    )
})


module.exports = forums;