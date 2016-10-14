var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
// custom library
// model
var Model = require('./../models/model');

//api for regiatering a user for particular event
router.post('/registerEvent',function(req,res,next) {
  if(req.isAuthenticated()) {
    var studentUser=req.user.toJSON().username;
  	var eventsName=req.body.eventsName;
    var dbEntry=new Model.User({username:studentUser}).fetch().
  	then(function (model) {
  	  var id = (model.toJSON().Id);
  		/*creating the row in database*/
      new Model.UserEvents({Id:id,eventName:eventsName}).
      save().
      then(function() {
        console.log("Events Registered");
        //add a response accordingly
        res.json({'message':"successful"});
    })
      .catch(function(error) {
       console.log("Error "+error);
       //add a response accordingly
        res.json({'message':"Failure"});

     });
  	}).
  	catch(function(error) {
     console.log("Error "+error);
     //add a response accordingly
        res.json({'message':"Failure"});
    });
  }
  else {
  	/* do change this redirect for actual website or app */
  	res.redirect('/auth/login');
  }
});

  //api for getting all events where a user is registered

  router.get('/userEvents',function(req,res,next) {
  if(req.isAuthenticated()) {
  var studentUser=req.user.toJSON().username;
  var dbEntry=new Model.User({username:studentUser}).fetch().
  then(function (model) {
    var id = model.toJSON().Id;
    Model.UserEvents.where('Id',id).fetchAll().
    then(function(model) {
    console.log(model.toJSON());
    res.send(model.toJSON());
    })
    .catch(function(error) {
       console.log("Error "+error);
       //add a response accordingly
        res.json({'message':"Failure"});
     });
  	});
  }
  else {
  	/* do change this redirect for actual website or app */
  	res.redirect('/auth/login');
  }
});
// api for cancelling a registered event 
router.delete('/removeUserEvent/:eventsName',function(req,res,next) {
  if(req.isAuthenticated()) {
    var studentUser=req.user.toJSON().username;
    var eventsName=req.params.eventsName;
    console.log(eventsName)
    var dbEntry=new Model.User({username:studentUser}).fetch().
  	then(function (model) {
  	  var id = (model.toJSON().Id);
  	  Model.UserEvents.where({Id:id,eventName:eventsName}).
      destroy().
      catch(function(error) {
       console.log("Error "+error);
     });
  	}).
  	catch(function(error) {
       console.log("Error "+error);
     });
  }
  else {
    /* do change this redirect for actual website or app */
    res.redirect('/auth/login');
  }
});
// router for register form only for testing 
router.get('/registerForm',function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
      res.render('eventRegister');
    }
});


module.exports = router;
