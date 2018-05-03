'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var familySchema = new Schema({

  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Family'
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  photos: [String],

  created:{
    type: Date
  },
  updated:{
    type: Date
  },


});

var family =module.exports = mongoose.model('family', familySchema);
