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
    public: Boolean,
    private: Boolean,
    admin:String,
    picture: {type:String, "default" : ""},
    users: {type: Array, "default" : []},
    mods:{type: Array, "default" : []},
    events: {type: Array, "default" : []},
    score:{type:Number , "default":0},
    slugify:{type:String, unique: true},
    time:Date,
    color:{
        type:String, 
        default :'lightgray'
    },

})

SocietySchema.pre("validate", function(next) {
    const community = this;
    
    if(community.name) {
        community.slug = slugify(community.name, { lower: true, strict: true });
    }

    next();
  })

// create a model
var SocietyModel = mongoose.model('societies', SocietySchema);

// export model
module.exports = SocietyModel;