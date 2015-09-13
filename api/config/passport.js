var LocalStrategy = require('passport-local').Strategy;
var User          = require("../models/user");
var jwt           = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'email' : email }, function(err, user) {

        if (err) return done(err);
        if (user) return done(null, false);

        var newUser           = new User();
        newUser.email         = email;
        newUser.firstname     = req.body.firstname;
        newUser.lastname      = req.body.lastname;
        newUser.password      = newUser.encrypt(password);
        newUser.twitterHandle = req.body.twitterHandle;

        newUser.save(function(err) {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    });
  }));
}