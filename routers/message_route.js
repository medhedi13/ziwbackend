'use strict';

var express = require("express");
var router = express.Router();
var message = require('./../models/message.js');
const async = require('async');


// Post new message
router.post("/", function (req, res) {
    let new_message = new message({
        Contenue: req.body.Contenue,
        vu: req.body.vu,
        Date_msg: req.body.Date_msg,
        sender: req.body.sender,
        recipient: req.body.recipient
    })
    new_message.save(function (err, message) {
        if (err) {
            res.json({
                success: false,
                description: "Post new message",
                message: "message registration faled",
                error: err
            })
        } else {
            res.json({success: true, description: "Post new message", message: "message registred", data: message})
        }
    })
})
// Get messages
router.get("/", function (req, res) {
    message.find(function (err, messages) {
        if (err) {
            res.json({success: false, description: "Get new message", error: err})
        } else {
            res.json({success: true, description: "Get new message", data: messages})
        }
    })
})
// Get message by id
router.get("//:id", function (req, res) {
    messages.findOne({_id: req.params.id}, function (err, messages) {
        if (err) {
            res.json({success: false, description: "Get new message", error: err})
        } else {
            res.json({success: true, description: "Get new message", data: messages})
        }
    })
})
// Delete message by id
router.delete("/:id", function (req, res) {
    message.remove({_id: req.params.id}, function (err, done) {
        if (err) {
            res.json({success: false, description: "Delete message", error: err})
        } else if (!done) {
            res.json({success: true, description: "Delete message", message: "message not deleted, try again"})
        } else {
            res.json({success: true, description: "Get new message", message: "message deleted"})
        }
    })
})

//end message
// exporting
module.exports = router;
