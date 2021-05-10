const express = require('express');
const cors = require('cors');
const societies = express.Router();
const app = express();

//import model
const SocietyModel = require('../models/Society');

//Use headers to give browser access to resources
societies.use(cors());
societies.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Register a society to the db
societies.post('/create', (req, res) => {
    const socData = {
        name: req.body.name,
        description: req.body.description,
        admin: req.body.admin,
        picture: req.body.picture,
        users: req.body.admin
    }

    console.log(socData);

    SocietyModel.findOne({
            name: req.body.name
        })
        .then(society => {
            console.log(society);
            // Checks if society exists in DB, if NOT, then proceed with creation.
            if (society == null) {
                console.log("Community is null");
                SocietyModel.create(socData)
                    .then(society => {
                        console.log(society);
                        res.json({
                            status: society.name + ' has been registered'
                        });
                    })
                    .catch(err => {
                        res.send(err);
                    })
                // If society is true then it already exists in DB.
            } else {
                res.json({
                    error: 'Community already exists'
                })
            }
            console.log("Community " + society.name + " has been registered!");
        })
        .catch(err => {
            res.send(err);
        })
})


// New get societies query, selected fields are passed in when calling axios.get
societies.get('/get-societies', (req, res, next) => {

    if (req.query.fields) {
        var query = SocietyModel
            .find({
                /* Can input limitations e.g post likes greater than 0 */ })
            .select(req.query.fields)
            .limit(parseInt(req.query.limit))

        query.exec(function (err, data) {
            if (err) return next(err);
            res.json({
                societies: data
            });
        });
    } else {
        console.log("MUST PASS IN REQUIRED FIELD VARIABLES TO ROUTE:/get-societies ")
    }

})

societies.get('/get-societies-page', (req, res) => {

    console.log(req.query.id);

    SocietyModel.findById({
            _id: req.query.id
        }).then(society => {
            if (society) {
                res.json({
                    society: society
                });
            } else {
                res.send("Society does not exist")
            }
        })
        .catch(err => {
            res.send(err)
        })

})

societies.get('/get-explore-societies', (req, res) => {

    // Gets two random societies from the database.
    SocietyModel.aggregate(
        [{
            // Gets a random sample of documents from the collection given a sample size.
            $sample: {
                size: 2
            }
        }, {
            // Specifies the inclusion of which fields to retrieve from the document.
            $project: {
                "name": 1,
                "college": 1,
                "picture": 1,
                "_id": 1
            }
        }],
        (err, data) => {
            res.json({
                societies: data
            });
        });

})

societies.get('/get-users-societies', (req, res, next) => {

    // Gets communities of the given user for the community list on profile.
    var query = SocietyModel
        .find({
            users: req.query.id
        })
        .select('name picture score')
        .sort({
            'score': -1
        })
        .limit(10)

    query.exec(function (err, data) {
        if (err) return next(err);
        res.json({
            societies: data
        });
    });
})

// Gets all of the users in a society
societies.get('/get-society-users', (req, res, next) => {

    var query = SocietyModel
        .findById({
            _id: req.query.id
        })
        .select('users')

    query.exec(function (err, data) {
        if (err) return next(err);
        res.json({
            users: data.users
        });
    });
})

societies.post('/update', (req, res) => {

    SocietyModel.findByIdAndUpdate({
            _id: req.body.society,
        }, {
            $addToSet: {
                users: req.body.user
            }
        }, {
            upsert: true,
            new: true,
            runValidators: true
        },

        function (err, result) {

            if (err) {
                res.send(err)
            } else {
                if (result) {
                    res.send(result)
                } else {
                    res.send("User already exists");
                }
            }

        }
    )
})


societies.post('/RemovedUser', (req, res) => {

    SocietyModel.findByIdAndUpdate({
            _id: req.body.society,
        }, {
            $pull: {
                users: req.body.user
            }
        }, {
            upsert: true,
            new: true,
            runValidators: true
        },

        function (err, result) {

            if (err) {
                res.send(err)
            } else {
                if (result) {
                    res.send(result)
                } else {
                    res.send("User already exists");
                }
            }

        }
    )
})

societies.post('/edit-society', (req, res) => {

    console.log(req.body);

    SocietyModel.findByIdAndUpdate({
            _id: req.body.id,
        }, {
            picture: req.body.society_pic,
            name: req.body.name,
            description: req.body.description,
        }, {
            upsert: true,
            new: true,
            runValidators: true
        },

        function (err, result) {

            if (err) {
                console.log(err);
                res.send(err)
            } else {
                if (result) {
                    console.log(result);
                    res.send(result)
                } else {
                    res.send("error");
                }
            }

        }
    )
})


societies.post('/deleteUser', (req, res) => { //delete user


    SocietyModel.updateOne({
            _id: req.body.id
        }, {
            $pull: {
                users: {
                    object: {
                        _id: req.body._id
                    }
                }
            }
        }, {
            new: true
        },

        function (err, result) {

            if (err) {
                res.send(err)
                console.log(err)
            } else {
                if (result) {
                    console.log(result)
                    res.send(result)
                } else {
                    res.send("User already exists");
                }
            }

        }
    )
})


societies.post('/addMod', (req, res) => { //delete user


    SocietyModel.updateOne({
            _id: req.body.id
        }, {
            $addToSet: {
                mods: req.body._id
            }
        }, {
            new: true
        },

        function (err, result) {

            if (err) {
                res.send(err)
                console.log(err)
            } else {
                if (result) {
                    console.log(result)
                    res.send(result)
                } else {
                    res.send("User already exists");
                }
            }

        }
    )
})

societies.delete('/deleteSoc:id', (req, res) => { //delete a society
    console.log(req.params.id);

    SocietyModel.deleteOne({
            _id: req.params.id
        },
        (error, data) => {
            res.json(data);

        })
})

// Function to Slugify


module.exports = societies;