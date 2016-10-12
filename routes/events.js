var express = require('express');
var router = express.Router();
var Model = require('./../models/model');

router.get('/add',function(req,res,next){
   if(req.isAuthenticated()) {
     var adminUser = req.user.toJSON().username;
     console.log(adminUser + " is trying to add an event");
     Model.Admin.where('username', adminUser).fetch().then(function(user) {
       if(user==null)
         console.log("Access Denied");
       else{
         var eventName = req.body.eventName;
         var description = req.body.description;
         var venue = req.body.venue;
         var time = req.body.time;
         var status = req.body.status;
         var coordinator = req.body.coordinator;
         // Sample Test Case
         // var eventName = "lala";
         // var description = "uou";
         // var venue = "ads";
         // var time = "2:20:20";
         // var status = "uo";
         // var coordinator = "ug";
         var addEvent = new Model.Event({eventName: eventName, description: description, venue: venue, time: time, status: status, coordinator: coordinator});
         addEvent.save().then(function() {
            console.log("Event Added Successfully");
         });
       }
     }).catch(function(err) {
          console.error(err);
        });
   }
   else {
     console.log("User not logged in");
   }
});

module.exports = router;
