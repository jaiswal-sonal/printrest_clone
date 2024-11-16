const mongoose = require('mongoose');
const plm=require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/newappp");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
  }],
  dp: {
    type: String,
   
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
   
   
  }
});
userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);

