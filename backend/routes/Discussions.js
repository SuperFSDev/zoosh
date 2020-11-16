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

    DiscussionModel.create({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        time: req.body.time,
        society: req.body.society.value,
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

module.exports = discussions;