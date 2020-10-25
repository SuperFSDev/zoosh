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

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:String})


    const PostSchema = new Schema({
        user:String,
        post:String,
        time:String
    })

    //creating problem schema
const ProblemSchema = new Schema({
    problem_type: Number,
    title: String,
    content: String
})

// create a model
const ProblemModel = mongoose.model('problems', ProblemSchema);


const UserModel = mongoose.model('user', userSchema);

const PostModel = mongoose.model('post', PostSchema);

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

app.get('/api/users', (req, res) => {

    UserModel.find((error, data) =>{
        res.json({users:data});
        console.log(data);
    })

})

app.get('/api/posts', (req, res) => {

    PostModel.find((error, data) =>{
        res.json({posts:data});
        console.log(data);
    })

})

app.get('/api/problems', (req, res) => {

    ProblemModel.find((error, data) =>{
        res.json({problems:data});
        console.log(data);
    })

})

//log connection to server
app.listen(port, () => console.log("Server is up!"));