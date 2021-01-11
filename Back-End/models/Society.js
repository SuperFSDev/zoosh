const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database schema
const SocietySchema = new Schema({
    name: String,
    college: String,
    category: String,
    address: String,
    description: String,
    facebook: String,
    twitter: String,
    instagram: String,
    other: String,
    private: Boolean,
    admin:String,
    users: {type: Array, "default" : []},
    mods:{type: Array, "default" : []},
    events: {type: Array, "default" : []},
    score:{type:Number , "default":0},
    slugify:{type:String, unique: true},
    time:Date,

})

// create a model
var SocietyModel = mongoose.model('societies', SocietySchema);

// export model
module.exports = SocietyModel;