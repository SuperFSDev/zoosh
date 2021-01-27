const express = require('express');
const cors = require('cors');
const listings = express.Router();
const app = express();

//import model
const ListingModel = require('../models/Listing');

//Use headers to give browser access to resources
listings.use(cors());
listings.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

listings.post('/NewListing', (req, res) => {

    console.log(req.body);

    ListingModel.create({
        user: req.body.user,
        user_id: req.body.user_id,
        subject: req.body.subject,
        description: req.body.description,
        rate: req.body.rate,
        time: req.body.time,
    });
})

listings.get('/getListings', (req, res) => {

    ListingModel.find((error, data) => {
        res.json({
            listings: data
        });
    })
})


module.exports = listings;