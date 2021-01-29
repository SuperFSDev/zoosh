const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require("slugify");

// create schema for the database
const DiscussionSchema = new Schema({
    user:String,
    user_id:String,
    title:{type: String , required: true},
    caption:String,
    content:String,
    time: {
        type: Date,
        default: Date.now,
    },
    society:String,
    claps:Number,
    comments:Array,
    picture: String,
    likes:{type:Number , "default":0},
    slug: {
        type: String,
        required: true,
        unique: true
      },
    
},{
    timestamps: true,
  }
);

DiscussionSchema.pre("validate", function(next) {
    const post = this;
    
    if(post.title) {
      post.slug = slugify(post.title, { lower: true, strict: true });
    }

    next();
  })


// create a post model
var DiscussionModel = mongoose.model('discussions', DiscussionSchema);


//export model
module.exports = DiscussionModel;
