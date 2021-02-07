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

module.exports = notifications;