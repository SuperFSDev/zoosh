const express = require('express');
const cors = require('cors');
const users = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//import model
const UserModel = require('../models/User');

//Use headers to give browser access to resources
users.use(cors());
users.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//key is stored in the process environment variable
process.env.SECRET_KEY = 'secret';

//Register users
users.post('/register', (req, res) => {

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    //Check if user is already registered
    //If User is not registered encrypt password using bcrypt
    UserModel.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            //pass in the password, salt it(function that hashes the input, password in this case)
            //set the password as the generated hash
            //create the user in the database and send the response
            //else send and error
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                UserModel.create(userData)
            })
            .then(user => {
                res.json({status: user.email + ' has been registered'});
            })
            .catch(err => {
                res.send(err);
            })
        }else{
            res.json({error: 'User already exists'})
        }
    })
    .catch(err => {
        res.send(err);
    })
    
    console.log("User has been registered!");
    console.log(userData);
})

//Login to site
users.post('/login', (req, res) => {
    //look for email in database
    UserModel.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user){
            //using the compareSync function from bcrypt
            //compare entered password with a stored hash in the database
            //if it mathches assign the user to a payload
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    _id: user.id,
                    username: user.username,
                    email: user.email
                }
                //associate a key to a payload (user in this case)
                //and send this token if login details are correct
                //else return an error
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                console.log(token);
                res.send(token)

                console.log("User " + user.username + " has been logged in!")
            }else{
                res.json({error: "Invalid login details"})
            }
        }else{
            res.send({error: 'Invalid login details'})
        }
    })
    .catch(err => {
        res.send(err);
    })
})

//Decode the token hash when the user enter the
//settings component
users.get('/settings', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    UserModel.findOne({
        _id: decoded.id
    })
    .then(user => {
        if(user){
            res.json(user)
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = users;