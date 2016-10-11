var express = require('express');
var router = express.Router();

var index = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/auth/login');
   }
   else {
      var user = req.user;
      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('index', {title: 'Home', user: user});
   }
};

module.exports.index = index;
