const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for the database
const NotificationSchema = new Schema({
    user_id:String,
    user_name:String,
    discussion_id:String,
    discussion_title: String,
    user_pic: String,
    message:String,
    time:Date,
})


// create a post model
var NotificationModel = mongoose.model('notifications', NotificationSchema);


//export model
module.exports = NotificationModel;
