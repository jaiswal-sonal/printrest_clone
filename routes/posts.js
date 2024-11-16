const mongoose = require('mongoose');
const { stringify } = require('uuid');

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true
  },

  image:{
    type:String

  },
  user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('post', postSchema);





