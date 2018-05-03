'use strict';
var express = require("express");
var router = express.Router();
const config = require('../config/database');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook');

// Exporting
module.exports = (passport_facebook) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new FacebookStrategy({
            clientID: '590969441262591',
            clientSecret: 'd5182c7c7d05815b49438a49b89b0a32',
            callbackURL: "https://localhost:8081/auth/facebook/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            cb(null, profile);

        }
    ));
}
router.get('/flogin',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {session: false}),
    function (req, res) {
        res.send('works perfectly fine!')
    });
