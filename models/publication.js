'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var publicationSchema = new Schema({

    content: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    photos: {type: String},

    created: {
        type: Date
    },
    updated: {
        type: Date
    }


});

var publication = module.exports = mongoose.model('publication', publicationSchema);
