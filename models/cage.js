'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var cageSchema = new Schema({

  number:{
    type: Number,
    required: true
  },
  size : {
    type: String,
    required: true
  },
  couple: {
    type: Schema.Types.ObjectId,
    ref: 'Couple'
  },
  bird: {
    type: Schema.Types.ObjectId,
    ref: 'Bird'
  },
  eggs: {
    type: Number
  },
  created:{
    type: Date
  },
  updated:{
    type: Date
  },


});

var cage =module.exports = mongoose.model('cage', cageSchema);
