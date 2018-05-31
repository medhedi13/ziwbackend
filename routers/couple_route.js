'use strict';
var express = require("express");
var router = express.Router();
var couple = require('./../models/couple.js');
const async = require('async');

// Post new couple
router.post("/", function (req, res) {
    let new_couple = new couple({
        male: req.body.male,
        female: req.body.female,
        owner:req.body.owner,
        name:req.body.name,
        description:req.body.description,
        created: new Date()
    })
    new_couple.save(function (err, couple) {
        if (err) {
            res.json({success: false, description: "Post new couple", message: "couple registration faled", error: err})
        } else {
            res.json({success: true, description: "Post new couple", message: "couple registred", data: couple})
        }
    })
})
// Get couples
router.get("/user/:id", function (req, res) {
    couple.find({owner: req.params.id}, function (err, couples) {
        if (err) {
            res.json({success: false, description: "Get new couple", error: err})
        } else {
            res.json({success: true, description: "Get new couple", data: couples})
        }
    })
})
// Get couple by id
router.get("/:Num_couple", function (req, res) {
    couples.findOne({Num_couple: req.params.Num_couple}, function (err, couples) {
        if (err) {
            res.json({success: false, description: "Get new couple", error: err})
        } else {
            res.json({success: true, description: "Get new couple", data: couples})
        }
    })
})
// Delete couple by id
router.delete("/:id", function (req, res) {
    couple.remove({_id: req.params.id}, function (err, done) {
        if (err) {
            res.json({success: false, description: "Delete couple", error: err})
        } else if (!done) {
            res.json({success: true, description: "Delete couple", message: "couple not deleted, try again"})
        } else {
            res.json({success: true, description: "Get new couple", message: "couple deleted"})
        }
    })
})
// Update couple / id
router.put("/:id", function (req, res) {
    couple.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                male: req.body.male,
                female: req.body.female,
                owner:req.body.owner,
                description: req.body.description,
                created: req.body.created
            }
        },
        {
            new: true
        }, function (err, couple) {
            if (err) {
                res.json({success: false, description: "Update couple", error: err})
            } else {
                res.json({success: true, description: "Update couple", message: "couple couple", data: couple})
            }
        })
})
// exporting
module.exports = router;
