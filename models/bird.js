'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var birdSchema = new Schema({
  ring: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'Family',
    required: true
  },
  birth: {
    type: Date
  },
  death: {
    dead: {
      type: Boolean,
      default: false
    },
    died: {
      type: Date
    },
    cause: {
      type: String
    }
  },
  description: {
    type: String
  },
  photos: [{
      type:String
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created:{
    type: Date
  },
  updated:{
    type: Date
  }
});


var bird =module.exports = mongoose.model('bird', birdSchema);
