var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
// custom library
// model
var Model = require('./../models/model');

router.get('/login',function(req, res, next) {
  if(req.isAuthenticated())
    res.redirect('/');
  else
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/auth/login'
}));

router.get('/signup',function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
      res.render('signup');
    }
});

router.post('/signup',function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();
   // model is not null means there already exsist a username so redirected to signup
   usernamePromise.then(function(model) {
      
      if(model) {
         res.render('signup');
      } else {
         var password = user.password;
         var hash = bcrypt.hashSync(password);
         var signUpUser = new Model.User({username: user.username, password: hash});
         signUpUser.save().then(function(model) {
            res.render('login');
         });
      }
   });
});

router.get('/signout',function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.status(404).render('error');
   } else {
      req.logout();
      res.redirect('/auth/login');
   }
});

module.exports = router;
