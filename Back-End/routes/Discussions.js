const express = require('express');
const cors = require('cors');
const discussions = express.Router();
const app = express();

//import model
const DiscussionModel = require('../models/Discussion');

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

    console.log(req.body);

    DiscussionModel.create({
        user: req.body.user,
        user_id: req.body.user_id,
        title: req.body.title,
        caption:req.body.caption,
        content: req.body.content,  
        time: req.body.time,
        society: req.body.society.value,
        picture: req.body.picture
    });
})

discussions.get('/getDiscussions', (req, res) => {

    DiscussionModel.find((error, data) => {
        res.json({
            discussions: data
        });
    })
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


discussions.get('/get-following-discussions', (req, res) => {

    DiscussionModel.find({
            user_id: req.query.id
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
            console.log(err);
        })

})


discussions.get('/get-society-discussions', (req, res) => {

    DiscussionModel.find({
            society: req.query.society
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
            console.log(err);
        })

})
discussions.post('/addComment', (req, res) => {

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

module.exports = discussions;