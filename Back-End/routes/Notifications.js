const express = require('express');
const app = express();
const cors = require('cors');
const notifications = express.Router();

//import model
const NotificationModel = require('../models/Notification');

//Use headers to give browser access to resources
notifications.use(cors());
notifications.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Create a notification for a user 
notifications.post('/notify', (req, res) => {
    console.log("Notified ID = " + req.body.user_id);
    NotificationModel.create({

        // user: req.body.user,
        user_id: req.body.user,
        user_name: req.body.user_name,
        user_pic: req.body.user_pic,
        discussion_id: req.body.discussion_id,
        discussion_title: req.body.discussion_title,
        message: req.body.message,
        time: req.body.time,
    });
})

// Get the notifications for user depending on id
notifications.get('/get-user-notifications', (req, res) => {

    var sort = req.query.sort;

    if(req.query.fields)
    {
        var query = NotificationModel
        .find({user_id: req.query.id})
        .select(req.query.fields)
        .sort({sort: -1})
        .limit(parseInt(req.query.limit));

        query.exec(function (err, data) {
            if (err) return next(err);
            res.json({
                notifications: data
            });
        });
    } else {
        console.log("MUST PASS IN REQUIRED FIELD VARIABLES TO ROUTE: /get-user-notifications ");
    }

})

module.exports = notifications;