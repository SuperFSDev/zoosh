const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const LinkSchema = new Schema({
    user:String,
    title:String,
    content:String,
    time:Date,
})


// create a post model
var LinkModel = mongoose.model('links', LinkSchema);

//export model
module.exports = LinkModel;
