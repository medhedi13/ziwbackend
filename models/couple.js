'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var coupleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    male: {
        type: Schema.Types.ObjectId,
        ref: 'Bird'
    },
    female: {
        type: Schema.Types.ObjectId,
        ref: 'Bird'
    },
    note: {
        type: String,
        required: false
    },
    created: {
        type: Date
    }
});

var couple = module.exports = mongoose.model('couple', coupleSchema);
