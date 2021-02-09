const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database schema
const SocietySchema = new Schema({
    name: String,
    description: String,
    public: Boolean,
    private: Boolean,
    admin:String,
    picture: {type:String, "default" : ""},
    users: {type: Array, "default" : []},
    mods:{type: Array, "default" : []},
    events: {type: Array, "default" : []},
    score:{type:Number , "default":0},
    time:Date,
    color:{
        type:String, 
        default :'lightgray'
    },

})

// create a model
var SocietyModel = mongoose.model('societies', SocietySchema);

// export model
module.exports = SocietyModel;