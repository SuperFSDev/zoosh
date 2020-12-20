const express = require('express');
const cors = require('cors');
const podcasts = express.Router();
const app = express();

//import model
const PodcastModel = require('../models/Podcast');

//Use headers to give browser access to resources
podcasts.use(cors());
podcasts.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

podcasts.post('/NewPodcast', (req, res) => {

    PodcastModel.create({
        user: req.body.user,
        name: req.body.name,
        link: req.body.link,
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
    });
})

podcasts.get('/GetPodcasts', (req, res) => {

    PodcastModel.find((error, data) => {
        res.json({
            podcasts: data
        });
    })
})

podcasts.get('/get-podcast-page', (req, res) => {

    PodcastModel.findById({
            _id: req.query.id
        }).then(podcast => {
            if (podcast) {
                res.json({
                    podcast: podcast
                });
            } else {
                res.send("podcast does not exist")
            }
        })
        .catch(err => {
            res.send(err)
        })

})


module.exports = podcasts;