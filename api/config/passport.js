var LocalStrategy    = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var User             = require("../models/user");
var jwt              = require('jsonwebtoken');

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

  // passport.use(new LinkedInStrategy({
  //   clientID: process.env.LINKEDIN_KEY,
  //   clientSecret: process.env.LINKEDIN_SECRET,
  //   callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  //   scope: ['r_emailaddress', 'r_basicprofile'],
  //   state: true,
  //   passReqToCallback: true
  // }, 
  // function(accessToken, refreshToken, profile, done) {
  //   // asynchronous verification, for effect...
  //   process.nextTick(function() {
  //     // To keep the example simple, the user's LinkedIn profile is returned to
  //     // represent the logged-in user. In a typical application, you would want
  //     // to associate the LinkedIn account with a user record in your database,
  //     // and return that user instead.
  //     console.log("LinkedIn profile: " + profile);
  //     return done(null, profile);
  //   });
  // }));

}