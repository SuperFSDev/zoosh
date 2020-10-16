const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Express imports
const express = require('express');
const app = express();
const port = 4000;

// Access cluster through link
const mongoDB = "mongodb+srv://tasq-admin:tasq@tasq-db.pb6yq.mongodb.net/tasqdb?retryWrites=true&w=majority";
mongoose.connect(mongoDB,{useNewUrlParser:true});

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

//Put the verification module (./routes/Users) into the variable Users
var Users = require('./routes/Users');
app.use('/users', Users)

//log connection to server
app.listen(port, () => console.log("Server is up!"));


/*const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

// create a user model
var UserModel = mongoose.model('users', UserSchema);

app.post('/users/register', (req,res)=>{
    console.log('Post request Successful');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.email);

    UserModel.create({
        firstname:req.body.firstname, 
        lastname:req.body.lastname, 
        email:req.body.email,
        password:req.body.password
    });

    res.json('post recieved!');
})

//log connection to server
app.listen(port, () => console.log("Server is up!"))*/