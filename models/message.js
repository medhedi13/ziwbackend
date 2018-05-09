'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var messageSchema = new Schema({


  content: {
    type:String,required:true
  },

  seen: {
    type:Boolean ,default: false,required:false
  },
  Date_msg: {
    type: String,
    required: Date,
    default:Date.now()
  },
  sender: {
    type: Schema.Types.ObjectId,ref: "user"
  },
  recipient: {
    type: Schema.Types.ObjectId,ref: "user",
  }

});

var message =module.exports = mongoose.model('message', messageSchema);
