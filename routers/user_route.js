'use strict';
var express = require("express");
var router = express.Router();
var User = require('../models/User.js');
const async = require('async');
var randomstring = require("randomstring");
const transporter = require('./../config/mailer');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("./../config/database");
var passport = require('passport');


// Post new User

	router.post("/", function(req, res, next){
		try{
			async.waterfall([
				(callback) => {
					User.findOne({email: req.body.email}, (err, user_exist) => {
						if (err) {return next(err);}
						else if (user_exist){
							res.json({success: false, description: 'post new User', message :'email already exists'})
						}
						else {
							callback();
						}
					})
				},
				(callback) => {

						let new_user = new User({
						first_name:req.body.first_name,
						last_name: req.body.last_name,
						phone:req.body.phone,
						email:req.body.email,
						password:req.body.password,
						city:req.body.city,
						avatar:req.body.avatar,
						created: Date.now()
					})
					new_user.save(function(err, user){
					  if (err) {
					    res.json({success: false, description: "Post new User", message: "User registration failed", error: err})
					  } else {
							var mailOptions = {
									form:'sfc.isgs@gmail.com',
									to: user.email,
									subject:'AtAOO, IteliDoc verification E-mail',
									generateTextFromHTML: true,
									html:'<p>You have been seleced to join ATAOO app</p>'

							};
							transporter.sendMail(mailOptions, function(error, info){
								if (error){
									console.log(error);
								}else {
									console.log('email sent:'+info.response);
								}
								transporter.close();

							});
					   callback(null, user)
					  }
					})
				},
				(err, results) => {
					 res.json({success: true, description: "Post new User", message: "User registred", data: results})
				}
			])
		} catch (err) {
			console.error({
				success: false,
				description: "Post new user",
				error: err
			});
		}

	})
	// Authentication
router.post("/authenticate", (req, res, next) => {
	try{
		async.waterfall([
			(callback) => {
				User.findOne({email: req.body.email}, (err, user_exist) => {
					if (err) { return next(err);}
					else if (!user_exist) {
						res.json({success: false,
						description: "user authentication",
						message: "your email does not exist"
					});
					} else {
						callback(null, user_exist);
					}
				})
			},
			(user, callback) => {
				bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
					if (err) { return next(err);}
					else if (!isMatch) {
						res.json({success: false,
						description: "user authentication",
						message: "Wrong password"
					});
					} else {
						callback(null, user);
					}
				})
			}
		], (err, results) => {
			const token = jwt.sign(results.toJSON(), config.secret,{
				expiresIn: 604800 // une semaine
			})
			res.json({success: true,
				description: "user authentication",
				message: "Welcome again",
				token: 'jwt ' +token,
				data: results
			});
		})
	} catch (err) {
		console.error({
			success: true,
			description: "user authentication",
			error: err
		})
	}
})

// Get Users
router.get("/", function(req, res){
	User.find(function(err, Users){
		if (err) {
			res.json({success: false, description: "Get all Users", error: err})
		} else {
			res.json({success: true, description: "Get all Users", data: Users})
		}
	})
})
// Get User by id

router.get("/:id", function(req, res){
	User.findOne({_id: req.params.id}, function(err, Users){
		console.log(Users);
		if (err) {
			res.json({success: false, description: "Get User", error: err})
		} else {
			res.json({success: true, description: "Get User", data: Users})
		}
	})
})
// Delete User by id
router.delete("/:id", function(req, res){
	User.remove({_id: req.params.id}, (err, done) => {
		if (err) {
			res.json({success: false, description: "Delete User", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete User", message: "User not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new User", message: "User deleted"})
		}
	})
})
// Update User / id
router.put("/:id", function(req, res){
    User.findOne({_id: req.params.id}, function(err, Users){
        console.log(Users);
        if (err) {
            res.json({success: false, description: "Get User", error: err})
        } else {
            User.findByIdAndUpdate(req.params.id, {
                    $set: {
                        first_name:req.body.first_name,
                        last_name: req.body.last_name,
                        phone:req.body.phone,
                        email:req.body.email,
                        password:Users.password,
                        city:req.body.city,
                        avatar:req.body.avatar,
                        created:Users.created,
                        updated:new Date()

                    }
                },
                {
                    new: true
                },function (err, User) {
                    if (err) {
                        res.json({success: false, description: "Update User", error: err})
                    } else {
                        res.json({success: true, description: "Update User", message: "User User", data: User})
                    }
                })

        }
    })

})

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope : ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// exporting
module.exports = router ;
