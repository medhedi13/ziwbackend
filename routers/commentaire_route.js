
'use strict';

var express = require("express");
var router = express.Router();
var commentaire = require('./../models/commentaire.js');
const async = require('async');



// Post new commentaire
router.post("/", function(req, res){
	let new_commentaire = new commentaire({
		user:req.body.user,
		post:req.body.post,
		content:req.body.content,
		created:Date.now()
	})
	new_commentaire.save(function(err, commentaire){
		if (err) {
			res.json({success: false, description: "Post new commentaire", commentaire: "commentaire registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new commentaire", commentaire: "commentaire registred", data: commentaire})
		}
	})
})
// Get commentaires
router.get("/", function(req, res){
	commentaire.find(function(err, commentaires){
		if (err) {
			res.json({success: false, description: "Get new commentaire", error: err})
		} else {
			res.json({success: true, description: "Get new commentaire", data: commentaires})
		}
	})
})
// Get commentaire by id
router.get("//:id", function(req, res){
	commentaires.findOne({_id: req.params.id}, function(err, commentaires){
		if (err) {
			res.json({success: false, description: "Get new commentaire", error: err})
		} else {
			res.json({success: true, description: "Get new commentaire", data: commentaires})
		}
	})
})
// Delete commentaire by id
router.delete("/:id", function(req, res){
	commentaire.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete commentaire", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete commentaire", commentaire: "commentaire not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new commentaire", commentaire: "commentaire deleted"})
		}
	})
})

//end commentaire
// exporting
module.exports =router ;
