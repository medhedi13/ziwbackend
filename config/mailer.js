'use strict';
const nodemailer = require ('nodemailer');

//
const transporter = nodemailer.createTransport({
  service :'gmail',
  host : 'smpt.gmail.com',
  port : 465,
  secure : true,
  auth: {
    user:'ataoo.app@gmail.com',
    pass:'ataooapp2018'
  }
})

module.exports = transporter;
