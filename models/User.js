'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    trim: true
  },
  facebook: {
      id : {
        type: String,
        trim: true
      },
      token : {
          type: String,
          trim: true
      },
      email : {
          type: String,
          trim: true
      },
      name : {
          type: String,
          trim: true
      }
  },
  created:{
    type: Date,
    trim: true
  },
  updated:{
    type: Date,
    trim: true
  }
});


//hashing a password before saving
UserSchema.pre('save', function(next){
  var user = this;
    bcrypt.hash(user.password, 10 ,function (err,hash) {
      if(err){return nes (err);}
      else{
          user.password= hash;
          next();
      }
  })
})

//exporting module
var User = module.exports = mongoose.model('User', UserSchema);
