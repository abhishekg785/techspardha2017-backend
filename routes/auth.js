var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
// custom library
// model
var Model = require('./../models/model');

router.get('/', function(req, res, next) {
  res.render('error');
});

var logIn = function(req, res, next) {
   if(req.isAuthenticated())
      res.redirect('/');
   else
      res.render('login');
};


module.exports = router;
