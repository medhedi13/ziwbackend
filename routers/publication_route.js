'use strict';

var express = require("express");
var router = express.Router();
var publication = require('./../models/publication.js');
const async = require('async');


// Post new publication
router.post("/", function (req, res) {
    let new_publication = new publication({
        content: req.body.content,
        user: req.body.user,
        photos: req.body.photos,
        created: Date.now()
    })
    new_publication.save(function (err, publication) {
        if (err) {
            res.json({
                success: false,
                description: "Post new publication",
                publication: "publication registration faled",
                error: err
            })
        } else {
            res.json({
                success: true,
                description: "Post new publication",
                publication: "publication posted",
                data: publication
            })
        }
    })
})
// Get publications
router.get("/", function (req, res) {
    publication.aggregate([{
        "$lookup":{
            from:"users",
            localField:"user",
            foreignField:"_id",
            as:"userInfo"
        }
    }]).sort({created:'desc'}).exec(function (err, publications) {
        if (err)
        { console.log(err);
            res.json({success: false, description: "Get new publication", error: err});
        } else {
            res.json({success: true, description: "Get new publication", data: publications});
        }
    })
})
// Get publications
router.get("/user/:id", function (req, res) {
    publication.find({user:req.params.id},function (err, publications) {
        if (err) {
            res.json({success: false, description: "Get new publication", error: err})
        } else {
            res.json({success: true, description: "Get new publication", data: publications})
        }
    })
})
// Get publication by id
router.get("/:id", function (req, res) {
    publications.findOne({_id: req.params.id}, function (err, publications) {
        if (err) {
            res.json({success: false, description: "Get new publication", error: err})
        } else {
            res.json({success: true, description: "Get new publication", data: publications})
        }
    })
})

router.post("/like/:id", function (req, res) {
    publication.findOne({_id: req.params.id,likes:{$in:[req.body.userid]}}).exec(function (err, publications) {


        if (err)
            res.json({success: false, description: "failed", error: err})

        if(publications==null||publications.length>0)
            publication.findByIdAndUpdate({_id:req.params.id},{$push:{likes:req.body.userid}}).exec(function (err,data) {

            if (err) {
                res.json({success: false, description: "like post", error: err})
            } else {
                res.json({success: true, description: "like post", data: data})
            }
        })
        else
            publication.findByIdAndUpdate({_id:req.params.id},{$pull:{likes:req.body.userid}}).exec(function (err,data) {

                if (err) {
                    res.json({success: false, description: "unlike post", error: err})
                } else {
                    res.json({success: true, description: "unlike post", data: data})
                }
            })


    })
})
// Delete publication by id
router.delete("/:id", function (req, res) {
    publication.remove({_id: req.params.id}, function (err, done) {
        if (err) {
            res.json({success: false, description: "Delete publication", error: err})
        } else if (!done) {
            res.json({
                success: true,
                description: "Delete publication",
                publication: "publication not deleted, try again"
            })
        } else {
            res.json({success: true, description: "Get new publication", publication: "publication deleted"})
        }
    })
})

//end publication
// exporting
module.exports = router;
