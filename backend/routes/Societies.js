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

    console.log("In create society function");

    const socData = {
        name: req.body.name,
        college: req.body.college,
        category: req.body.category,
        address: req.body.address,
        description: req.body.description,
        private: req.body.private
    }

    //Check if user is already registered
    //If User is not registered encrypt password using bcrypt
    SocietyModel.findOne({
        name: req.body.name
    })
        .then(society => {
            // Checks if society exists in DB, if NOT, then proceed with creation.
            if (!society) {
                SocietyModel.create(socData)
                    .then(society => {
                        res.json({ status: society.name + ' has been registered' });
                    })
                    .catch(err => {
                        res.send(err);
                    })
                // If society is true then it already exists in DB.
            } else {
                res.json({ error: 'Society already exists' })
            }
        })
        .catch(err => {
            res.send(err);
        })

    console.log("Society has been registered!");
    console.log(socData);
})


// Get societies from database
societies.get('/getSocieties', (req, res) => {

    SocietyModel.find((error, data) => {
        res.json({ societies: data });
        console.log(data);
    })

})

societies.get('/get-societies-page', (req, res) => {

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

societies.post('/update', (req, res) => {
    
    SocietyModel.findOneAndUpdate(
        { name: req.body.society, },
        { $addToSet: { users: req.body.user } },
        { upsert: true, new: true, runValidators: true },

        function (err, result) {

            if (err) {
                res.send(err)   
            }
            else {
                if(result){
                    res.send(result)
                } else {
                    res.send("User already exists");
                }
            }

        }
    )
})

module.exports = societies;