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

router.post('/login',function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/',failureRedirect: '/auth/login'}, function(err, user, info) {
    if(err) {
      res.render('login');
    }
    if(!user) {
      res.render('login');
    }
    req.logIn(user, function(err) {
      if(err) {
        res.render('login');
      } else {
        res.redirect('/');
         }
      });
  })(req, res, next);
});

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

router.get('/details',function(req,res,next){
  console.log("Error code = " + res.status(302).render('login'));
});

router.post('/details',function(req, res, next){
  var username = req.body.username;
  var rollNo = req.body.rollNo;
  var phoneNo = req.body.phoneNo;
  var interests = req.body.interests;
  var stringOfInterests = "";
  for(var i=0; i<interests.length; i++){
    stringOfInterests += interests[i] + ',';
  }
  console.log(username + " " + rollNo + " " + phoneNo + " " + stringOfInterests);
  
  var detailsPromise = null;
  detailsPromise = new Model.Details({username: username}).fetch();

  detailsPromise.then(function(model) {
      if(model) {
         res.render('redirection');
      } else {
         var fillUserDetails = new Model.Details({username: username, rollNo: rollNo, phoneNo: phoneNo, interests: stringOfInterests});
         fillUserDetails.save().then(function(model) {
            res.render('redirection');
         });
      }
   });

});

module.exports = router;
