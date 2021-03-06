'use strict';

var express = require("express");
var router = express.Router();
var message = require('./../models/message.js');
const async = require('async');


// Post new message
router.post("/", function (req, res) {
    let new_message = new message({
        content: req.body.content,
        seen: req.body.seen,
        Date_msg: new Date(),
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
router.get("/:id/:user", function (req, res) {
    message.find({sender: {$in:[req.params.id,req.params.user]},recipient:{$in:[req.params.id,req.params.user]}}, function (err, messages) {
        if (err) {
            res.json({success: false, description: "Get new message", error: err})
        } else {
            let i,result={
                "array":[]
            };
            for(i=0;i<messages.length;i++){
                let x=messages[i];
                let date=new Date(messages[i].Date_msg).getTime();
                result.array.push(    {
                    "messageId":date,
                    "userId":messages[i].sender,
                    "userName":"Luff",
                    "userImgUrl":"./assets/user.jpg",
                    "toUserId":messages[i].recipient,
                    "toUserName":"Hancock",
                    "userAvatar":"./assets/to-user.jpg",
                    "time":1488349800000,
                    "message":JSON.parse(JSON.stringify(x)).content,
                    "status":"success"

                });
            }
            res.json(result)
        }
    })
})
// Delete message by id
router.delete("/:id/:user", function (req, res) {
    message.remove({sender: {$in:[req.params.id,req.params.user]},recipient:{$in:[req.params.id,req.params.user]}}, function (err, done) {
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
