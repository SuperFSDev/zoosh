const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Express imports
const express = require('express');
const app = express();
const port = 4000;

// Access cluster through link
const mongoDB = "mongodb+srv://tasq-admin:tasq@tasq-db.pb6yq.mongodb.net/tasqdb?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Use headers to give browser access to resources
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Add the "Users" route to the server.
var Users = require('./routes/Users');
app.use('/users', Users)

// Adds the "Problems" route to the server.
var Problems = require('./routes/Problems');
app.use('/problems', Problems)

// Adds the "Posts" route to the server.
var Posts = require('./routes/Posts');
app.use('/posts', Posts)

//log connection to server
app.listen(port, () => console.log("Server is up on port " + port));