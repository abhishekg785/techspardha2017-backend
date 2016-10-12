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

// router.post('/login',
//   // function(req, res, next) {
//   passport.authenticate('local',
//    { 
//     successRedirect: '/',
//     failureRedirect: '/auth/login'
//   });
//   // , function(err, user, info) {
//   //   if(err) {
//   //     res.render('login');
//   //   }
//   //   if(!user) {
//   //     res.render('login');
//   //   }
//   //   req.logIn(user, function(err) {
//   //     if(err) {
//   //       res.render('login');
//   //     } else {
//   //       res.redirect('/');
//   //        }
//   //     });
//   // })(req, res, next);
// });

passport.use(new LocalStrategy(function(username, password, done) {
  new Model.User({username: username}).fetch().then(function(data) {
    var user = data;
    if(user === null) {
      return done(null, false, {message: 'Invalid username or password'});
    } else {
        user = data.toJSON();
        if(!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {message: 'Invalid username or password'});
        } else {
            return done(null, user);  //call the serialize
          }
      }
  });
}));

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
