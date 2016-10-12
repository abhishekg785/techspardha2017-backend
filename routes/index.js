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
         res.render('redirection',{title: 'Success', user: username});
      }else{
        res.render('details', {title: 'Home', user: username});
      }
    });
  }
  
});

// Details page with get request is being redirected to login page.
router.get('/details',function(req,res,next){
  console.log("Error code = " + res.status(302).render('login'));
});

// Getting the details of the user like interests, phoneNo, rollNo.
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
         res.render('redirection',{title: 'Success', user: username});
      } else {
         var fillUserDetails = new Model.Details({username: username, rollNo: rollNo, phoneNo: phoneNo, interests: stringOfInterests});
         fillUserDetails.save().then(function(model) {
            res.render('redirection',{title: 'Success', user: username});
         });
      }
   });

});

module.exports = router;


