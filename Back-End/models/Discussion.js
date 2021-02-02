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
    commentsCount:Number,
    thumbnail_pic: String,
    full_pic: String,
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

    var result           = ' ';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var commentsLength = post.comments.length;

    commentsLength = post.commentsCount;

    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    
    if(post.title) {
      post.slug = slugify(post.title + result, { lower: true, strict: true });
    }

    next();
  })
 

// create a post model
var DiscussionModel = mongoose.model('discussions', DiscussionSchema);


//export model
module.exports = DiscussionModel;
