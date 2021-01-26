const express = require('express');
const cors = require('cors');
const events = express.Router();
const app = express();

//import model
const EventModel = require('../models/Event');

//Use headers to give browser access to resources
events.use(cors());
events.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

events.post('/NewEvents', (req, res) => {

    EventModel.create({
        user: req.body.user,
        title: req.body.title,
        time: req.body.time,
        society: req.body.society.value,
        description: req.body.description,
    });
})

events.get('/getEvents', (req, res) => {

    EventModel.find((error, data) => {
        res.json({
            events: data
        });
    })
})


// Add Event To Society
events.post('/addEventToSociety', (req, res) => {
    EventModel.findByIdAndUpdate(
        { _id: req.body.user_id, },
        { $addToSet: { events: req.body.event } },
        { upsert: true, new: true, runValidators: true },

        function (err, result) {

            if (err) {
                res.send(err)   
            }
            else {
                if(result){
                    console.log(result);
                    res.send(result)
                } else {
                    res.send("Event already exists in society model.");
                }
            }

        }
    )
})


events.get('/get-society-events', (req, res) => {

    EventModel.find({
            society: req.query.society
        }).then(event => {
            if (event) {
                res.json({
                    event: event
                });
            } else {
                res.send("event does not exist")
            }
        })
        .catch(err => {
            res.send(err)
            console.log(err);
        })

})

events.get('/get-events-page', (req, res) => {

    EventModel.findById({
            _id: req.query.id
        }).then(event => {
            if (event) {
                res.json({
                    event: event
                });
            } else {
                res.send("event does not exist")
            }
        })
        .catch(err => {
            res.send(err)
        })

})

module.exports = events;