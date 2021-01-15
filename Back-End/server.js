const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Express imports
const express = require('express');
const app = express();
const port = 4000;

// Access cluster through link
const mongoDB = "mongodb+srv://tasq-admin:tasq@tasq-db.pb6yq.mongodb.net/tasqdb?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

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

// Adds the "Comments" route to the server.
var Comments = require('./routes/Comments');
app.use('/comments', Comments)

// Adds the "Discussions" route to the server.
var Discussions = require('./routes/Discussions');
app.use('/discussions', Discussions)

// Adds the "Societies" route to the server.
var Societies = require('./routes/Societies');
app.use('/societies', Societies);

// Adds the "Links" route to the server.
var Links = require('./routes/Links');
app.use('/links', Links);

// Adds the "Forums" route to the server.
var Forums = require('./routes/Forums');
app.use('/forums', Forums);

// Adds the "Events" route to the server.
var Events = require('./routes/Events');
app.use('/events', Events);

// Adds the "Podcasts" route to the server.
var Podcasts = require('./routes/Podcasts');
app.use('/podcasts', Podcasts);

// Adds the "Tutors" route to the server.
var Tutors = require('./routes/Tutors');
app.use('/tutors', Tutors);



//log connection to server
app.listen(port, () => console.log("Server is up on port " + port));