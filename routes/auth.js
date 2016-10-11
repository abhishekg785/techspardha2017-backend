var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
// custom library
// model
var Model = require('./../models/model');

var logIn = function(req, res, next) {
   if(req.isAuthenticated())
      res.redirect('/');
   else
      res.render('login');
};

var signInPost = function(req, res, next) {
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/auth/login'}, function(err, user, info) {
      if(err) {
         return res.render('login');
      }
      if(!user) {
         return res.render('signin');
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin');
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/');
   } else {
      res.render('signup');
   }
};

var signUpPost = function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('signup');
      } else {
         var password = user.password;
         var hash = bcrypt.hashSync(password);
         var signUpUser = new Model.User({username: user.username, password: hash});
         signUpUser.save().then(function(model) {
            signInPost(req, res, next);
         });
      }
   });
};

var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      notFound404(req, res, next);
   } else {
      req.logout();
      res.redirect('/auth/login');
   }
};

var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('error');
};

module.exports.logIn = logIn;
module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.signOut = signOut;
module.exports.notFound404 = notFound404;
