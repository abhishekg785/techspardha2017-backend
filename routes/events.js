var express = require('express');
var router = express.Router();
var Model = require('./../models/model');

router.post('/update',function(req,res,next) {
  if(req.isAuthenticated()) {
   var adminUser = req.user.toJSON().username;
   console.log(adminUser + " is trying to update an event");
   Model.Admin.where('username', adminUser).fetch().then(function(user) {
     if(user==null)
       console.log("Access Denied");
     else{
       var eventName = req.body.eventName;
       var description = req.body.description;
       var venue = req.body.venue;
       var time = req.body.time;
       var status = req.body.status;
       // Sample Test Case
      //  var eventName = "da";
      //  var description = "uou";
      //  var venue = "ads";
      //  var time = "2:20:20";
      //  var status = "uo";
       var addEvent = new Model.Event({eventName: eventName});     //Updates a particular event
       addEvent.save({description: description, venue: venue, time: time, status: status},{patch: true}).then(function() {
          console.log("Event Updated Successfully");
       });
     }
   }).catch(function(err) {
        console.error(err);
      });
 }
 else {
   console.log("User not logged in");
   res.redirect('/auth/login');
 }
});

router.get('/view',function(req,res,next) {
  Model.Event.fetchAll().then(function(data) {
    res.send(JSON.stringify(data));                  //Gets the complete list of events
  }).catch(function(err) {
      console.error(err);
  });
});

module.exports = router;
