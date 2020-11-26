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
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,        
        time: req.body.time,

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
            // Only use bcrypt if user is using windows, else compare passwords regularly.
            var useBcrypt = req.body.platform.includes("Linux") ? false : true;

            console.log(useBcrypt);

            if(!useBcrypt) {
                if(req.body.password === user.password){
                    const payload = {
                        _id: user.id,
                        fullname: user.fullname,
                        email: user.email,
                        societies: user.societies,
                        pic: user.pic
                    }
                    //console.log(payload);
                    res.send(payload);

                    console.log("User " + user.fullname + " has been logged in!")
                }else{
                    console.log("Invalid login details");
                    res.json({error: "Invalid login details"})
                }
            }
            else {
                console.log(req.body.password, + " == " + user.password);
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const payload = {
                        _id: user.id,
                        fullname: user.fullname,
                        email: user.email,
                        societies: user.societies,
                        pic: user.pic
                    }
                    //console.log(payload);

                    res.send(payload);

                    console.log("User " + user.fullname + " has been logged in!")
                } else {
                    res.json({error: "Invalid login details"})
                }
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

users.get('/getUsers', (req, res) => {

    UserModel.find((error, data) =>{
        res.json({users:data});
        //console.log(data);
    })

})

users.post('/edit-user-profile', (req, res) => {

    console.log("REQUEST PIC = " + req.body.pic);

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        UserModel.findByIdAndUpdate(
            { _id: req.body.user_id, },
            {
                pic: req.body.pic,
                fullname: req.body.fullname,
                bio: req.body.bio,
                college: req.body.college,
                course: req.body.course,
                dob: req.body.dob,
                password: hash},
            { upsert: true, new: true, runValidators: true },

            function (err, result) {

                if (err) {  
                    console.log("error");
                    res.send(err)   
                }
                else {
                    if(result){
                        console.log(result);
                        res.send(result)
                    } else {
                        res.send("error");
                    }
                }

            }
        )
    })
})



users.post('/addPost', (req, res) => {

    UserModel.findByIdAndUpdate(
        
  { _id: req.body.user_id},
  { score : req.body.score,
         $addToSet: { posts: req.body.post } },
        { upsert: true, new: true, runValidators: true },
        //console.log('here now.' + req.body.post),
        function (err, result) {

            if (err) {  
                console.log("error" + err);
                res.send(err)   
            }
            else {
                if(result){
                    console.log("jkldsjflksjdflkjsl"+result);
                    res.send(result)
                } else {
                    res.send("Society already exists in user model.");
                }
            }

        }
    )
})


users.post('/addComment', (req, res) => {

    UserModel.findByIdAndUpdate(
        
  { _id: req.body.post_id},
  { $addToSet: { comments: req.body.comment } },
        { upsert: true, new: true, runValidators: true },
        //console.log('here now.' + req.body.post),
        function (err, result) {

            if (err) {  
                console.log("error" + err);
                res.send(err)   
            }
            else {
                if(result){
                    console.log("jkldsjflksjdflkjsl"+result);
                    res.send(result)
                } else {
                    res.send("Society already exists in user model.");
                }
            }

        }
    )
})

users.post('/addToSocList', (req, res) => {
    
    UserModel.findByIdAndUpdate(
        { _id: req.body.user_id, },
        { $addToSet: { societies: req.body.society } },
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
                    res.send("Society already exists in user model.");
                }
            }

        }
    )
})

users.post('/addToFollowingList', (req, res) => {
    //COMPLETE - FULLY FUNCTIONAL
    UserModel.findOneAndUpdate(
        { _id: req.body.user_id, },
        { $addToSet: { following: req.body.user} },
        { upsert: true, new: true, runValidators: true },

        function (err, result) {
            console.log(result);
            if (err) {
                res.send(err)   
            }
            else {
                if(result){
                    console.log(result);
                    res.send(result)
                } else {
                    res.send("User already following.");
                }
            }

        }
    )
})



users.post('/updateFollowers', (req, res) => {
    
    UserModel.findByIdAndUpdate(
        { _id: req.body.user_id, },
        { $addToSet: { followers: req.body.user } },
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

// FOLLOW A FORUM
users.post('/addToForumFollowingList', (req, res) => {
    
    UserModel.findByIdAndUpdate(
        { _id: req.body.user_id, },
        { $addToSet: { forums: req.body.forum } },
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
                    res.send("Already following forum");
                }
            }

        }
    )
})


// Gets one users societies
users.get('/getUserSocieties', (req, res) => {

    UserModel.findById({
        _id: req.query.id
    }).then(user => {
        if(user){
            res.json({societies:user.societies});
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.send(err)
    })

})

// Gets one users details
users.get('/get-user-details', (req, res) => {

    UserModel.findById({
        _id: req.query.id
    }).then(user => {
        if(user){
            res.json({user:user});
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.send(err)
    })

})

module.exports = users;