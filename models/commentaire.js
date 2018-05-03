'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var commentaireSchema = new Schema({


  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  content: {
    type: String,
    required: true
  },
  created:{
    type: Date
  }



});

var commentaire =module.exports = mongoose.model('commentaire', commentaireSchema);
