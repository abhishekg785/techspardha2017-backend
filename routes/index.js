var express = require('express');
var router = express.Router();
var Model = require('./../models/model');

router.get('/',function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }
  else {
    var user = req.user;
    var username = user.toJSON().username;
    console.log(user.toJSON().username + " is logged in ");
    if(user !== undefined) {
      user = user.toJSON();
    }
    //res.render('index', {title: 'Home', user: username});
    var detailsPromise = null;
    detailsPromise = new Model.Details({username: username}).fetch();
  
    detailsPromise.then(function(model){
      if(model) {
         res.render('redirection');
      }else{
        res.render('details', {title: 'Home', user: username});
      }
    });
  }
  
});

module.exports = router;


