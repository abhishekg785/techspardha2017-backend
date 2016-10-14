var express = require('express');
var router = express.Router();
var Model = require('./../models/model');
var IdOfUser;

router.get('/',function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/auth/login');
  }
  else {
    var user = req.user;
    var username = user.toJSON().username;
    IdOfUser = user.toJSON().Id;

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

  if(typeof(interests) == "object") {
    for(var i=0; i<interests.length; i++){
      stringOfInterests += interests[i] + ',';
      console.log(stringOfInterests);
    }
  }else{
    stringOfInterests = interests;
  }
  
  var detailsPromise = null;
  detailsPromise = new Model.Details({username: username}).fetch();
  detailsPromise.then(function(model) {
      if(model) {
         res.render('redirection',{title: 'Success', user: username});
      } else {
        var fillUserDetails = new Model.Details({Id: IdOfUser, username: username, rollNo: rollNo, phoneNo: phoneNo, interests: stringOfInterests});
         fillUserDetails.save().then(function(model) {
            res.render('redirection',{title: 'Success', user: username});
         });
      }
   });

});

//Suggestions router
router.get('/suggestions',function(req, res, next) {
  
  var username = req.user.toJSON().username;
  //console.log("_____________________" + username);
  var interestsPromise = null;
  interestsPromise = new Model.Details({username: username}).fetch();
  interestsPromise.then(function(data) {

  // now printing only interests
  var interests = data.toJSON().interests;
  var interestsArray = interests.split(',');

  //console.log(interestsArray);
  var results = [],  done = 0, total = interestsArray.length;
  for(var i=0; i<total; i++) {
    Model.Event.where('typeOfEvent', interestsArray[i]).fetchAll().then(function(suggestedEvents) {
      //console.log(suggestedEvents.toJSON());
      var jsonArray = suggestedEvents.toJSON();
      if (jsonArray.length > 0) 
        results.push(jsonArray);
      if (++done == total){
        res.send(results);
      }
    });
  }


  }).catch(function(error) {
    console.log('error occured');
    console.log(error);
  });

});

module.exports = router;


