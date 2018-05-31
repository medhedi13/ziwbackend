'use strict';
var express = require("express");
var router = express.Router();
var cage = require('./../models/cage.js');
const async = require('async');

var ObjectId = require('mongodb').ObjectID;
// Post new cage
router.post("/", function (req, res) {
    let new_cage = new cage({
        number: Number(req.body.number),
        size: req.body.size,
        couple: req.body.couple,
        owner: req.body.owner,
        eggs: Number(req.body.eggs),
        created: Date.now()
    })
    new_cage.save(function (err, cage) {
        if (err) {
            res.json({success: false, description: "Post new cage", message: "cage registration failed", error: err})
        } else {
            res.json({success: true, description: "Post new cage", message: "cage registred", data: cage})
        }
    })
})
// Get cages
router.get("/", function (req, res) {
    cage.find(function (err, cages) {
        if (err) {
            res.json({success: false, description: "Get new cage", error: err})
        } else {
            res.json({success: true, description: "Get new cage", data: cages})
        }
    })
})
// Get cages
router.get("/user/:id", function (req, res) {
    cage.aggregate([
        {
            "$match": {
                "owner": ObjectId(req.params.id)
            }
        },
        {
            "$lookup": {
                from: "couples",
                localField: "couple",
                foreignField: "_id",
                as: "coupleInfo"
            }
        },
        {
            "$lookup": {
                from: "birds",
                localField: "coupleInfo.0.female",
                foreignField: "_id",
                as: "femaleInfo"
            }
        },
        {
            "$lookup": {
                from: "birds",
                localField: "coupleInfo.0.male",
                foreignField: "_id",
                as: "maleInfo"
            }
        },
        {
            "$match": {
                "maleInfo": { $size: 1 },
                "femaleInfo": { $size: 1 },
                "coupleInfo": { $size: 1 },
            }
        }
    ]).exec(function (err, cages) {
        if (err) {
            res.json({success: false, description: "Get new cage", error: err})
        } else {
            res.json({success: true, description: "Get new cage", data: cages})
        }
    })
});
// Get cage by id
router.get("/:Num_cage", function (req, res) {
    cages.findOne({Num_cage: req.params.Num_cage}, function (err, cages) {
        if (err) {
            res.json({success: false, description: "Get new cage", error: err})
        } else {
            res.json({success: true, description: "Get new cage", data: cages})
        }
    })
})
// Delete cage by id
router.delete("/:id", function (req, res) {
    cage.remove({_id: req.params.id}, function (err, done) {
        if (err) {
            res.json({success: false, description: "Delete cage", error: err})
        } else if (!done) {
            res.json({success: true, description: "Delete cage", message: "cage not deleted, try again"})
        } else {
            res.json({success: true, description: "Get new cage", message: "cage deleted"})
        }
    })
})
// Update cage / id
router.put("/:id", function (req, res) {
    cage.findByIdAndUpdate(req.params.id, {
            $set: {
                number: Number(req.body.number),
                size: req.body.size,
                couple: req.body.couple,
                owner: req.body.owner,
                eggs: Number(req.body.eggs),
            }
        },
        {
            new: true
        }, function (err, cage) {
            if (err) {
                res.json({success: false, description: "Update cage", error: err})
            } else {
                res.json({success: true, description: "Update cage", message: "cage cage", data: cage})
            }
        })
})
// exporting
module.exports = router;
