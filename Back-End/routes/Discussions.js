const express = require('express');
const cors = require('cors');
const discussions = express.Router();

//import model
const DiscussionModel = require('../models/Discussion');

//import multer and gridfs storage engine
const singleUpload = require('../server');

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

    console.log("ID = " + req.body.user_id);

    DiscussionModel.create({
        user: req.body.user,
        user_id: req.body.user_id,
        title: req.body.title,
        caption:req.body.caption,
        content: req.body.content,  
        time: req.body.time,
        society: req.body.society.value,
        society_id: req.body.society.society_id,
        thumbnail_pic: req.body.thumbnail_picture,
        full_pic: req.body.full_picture,
        user_pic: req.body.user_pic
    });

})

// New get discussion query, selected fields are passed in when calling axios.get
discussions.get('/get-discussions', (req, res, next) => {

    var sort = req.query.sort;

    if(req.query.fields)
    {
        var query = DiscussionModel
        .find()
        .select(req.query.fields)
        .sort({sort: -1})
        .limit(parseInt(req.query.limit));

        query.exec(function (err, data) {
            if (err) return next(err);
            res.json({
                discussions: data
            });
        });
    } else {
        console.log("MUST PASS IN REQUIRED FIELD VARIABLES TO ROUTE:/get-discussions ");
    }

})

discussions.get('/get-following-feed', (req, res, next) => {

    var following = req.query.ids.following;
    var discussions = [];

    for(var i = 0; i < following.length; i++) 
    {
        // Gets discussions for the given user ID
        var query = DiscussionModel
            .find({user_id: following[i]})
            .select('user society time thumbnail_pic user_pic title content likes comments user_id')
            .sort({'likes': -1})
        
        query.exec(function (err, data) {
            // Error check
            if (err) return next(err);

            discussions.push(data);
            if(discussions.length == following.length) {
                res.json({
                    discussions: data
                });
            }
        });
    }
})

discussions.get('/get-discussion-page', (req, res) => {
    DiscussionModel.findById({
            _id: req.query.id
        }).then(discussion => {
            if (discussion) {
                res.json({
                    discussion: discussion
                });
            } else {
                res.send("Discussion does not exist")
            }
        })
        .catch(err => {
            res.send(err)
        })

})


discussions.get('/get-user-discussions', (req, res) => {

    var sort = req.query.sort;

    if(req.query.fields)
    {
        var query = DiscussionModel
        .find({user_id: req.query.id})
        .select(req.query.fields)
        .sort({sort: -1})
        .limit(parseInt(req.query.limit));

        query.exec(function (err, data) {
            if (err) return next(err);
            res.json({
                discussions: data
            });
        });
    } else {
        console.log("MUST PASS IN REQUIRED FIELD VARIABLES TO ROUTE: /get-user-discussions ");
    }

})




discussions.get('/get-society-discussions', (req, res) => {

    var sort = req.query.sort;

    if(req.query.fields)
    {
        var query = DiscussionModel
        .find({society: req.query.society})
        .select(req.query.fields)
        .sort({sort: -1})
        .limit(parseInt(req.query.limit));

        query.exec(function (err, data) {
            if (err) return next(err);
            res.json({
                discussions: data
            });
        });
    } else {
        console.log("MUST PASS IN REQUIRED FIELD VARIABLES TO ROUTE: /get-user-discussions ");
    }

})




discussions.delete('/getDiscussions:id', (req, res) => {  //delete a discussion
    console.log(req.params.id);

    DiscussionModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            res.json(data);

        })
})
discussions.post('/CreateComment', (req, res) => {

    DiscussionModel.findByIdAndUpdate(

        {
            _id: req.body._id
        }, {
            $addToSet: {
                comments: req.body.comment
            }
        }, {
            upsert: true,
            new: true,
            runValidators: true
        },
        //console.log('here now.' + req.body.post),
        function (err, result) {

            if (err) {
                console.log("error" + err);
                res.send(err)
            } else {
                if (result) {
                    console.log("Post: " + result);
                    res.send(result)
                } else {
                    res.send("Society already exists in user model.");
                }
            }

        }
    )
})

discussions.post('/UpdateLikeCount', (req, res) => {

    DiscussionModel.findByIdAndUpdate(

        { _id: req.body.discussion},
        { likes : req.body.likeCount},
              //console.log('here now.' + req.body.post),
              function (err, result) {

            if (err) {
                console.log("error" + err);
                res.send(err)
            } else {
                if (result) {
                    res.send(result)
                } else {
                    res.send("error");
                }
            }

        }
    )
})

module.exports = discussions;