var User     = require('../models/user');
var jwt      = require('jsonwebtoken');
var passport = require('passport');
var secret   = require('../config/config').secret;
var request  = require('request');

function signup(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).send(err, info);
    if (!user) return res.status(401).send({ error: 'User already exists!' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({ 
      success: true,
      message: "Welcome budding author.",
      token: token
    });
  })(req, res, next);
};

function login(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(401).send({ message: 'No user with that name exists here.' });

    if (!user.validPassword(req.body.password)) return res.status(401).send({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: 'Get your writing boots on.',
      token: token,
      user: user
    });
  });
};

function linkedInLogin(req, res, next){  
 //  console.log("about to login to linkedin");

 // passport.authenticate('linkedin', { state: 'true' }),
 // function(req, res){
 //   // The request will be redirected to Linkedin for authentication, so this
 //   // function will not be called.
 // };

  var accessTokenUrl = "https://www.linkedin.com/uas/oauth2/accessToken";

  // Build the params to send a request for an access_token
  var params = {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: 'http://127.0.0.1:3000/api/auth/linkedin',
    client_id: process.env.LINKEDIN_KEY,
    client_secret: process.env.LINKEDIN_SECRET
  };

   // Step 1. Exchange authorization code for access token.
  request.post({ 
    url: accessTokenUrl, 
    form: params, 
    json: true 
  }, function(error, response, body) {
    var access_token = response.body.access_token;
    var expires_in   = response.body.expires_in;

    // Check for user with access_token saved
    User.findOne({
      access_token: access_token
    }, function(err, user) {
      if (err) return res.status(500).send(err);

      if (!user) {
        console.log("NO USER")
        // If not, fetch additional user information from linkedin
        request.get({ 
          url: "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,headline,picture-url,industry,location,num-connections,specialties,positions,public-profile-url)?oauth2_access_token="+access_token + '&format=json', 
          json: true 
        }, function(error, response, body){
          console.log(response.body)

        });
      }

      // var token = jwt.sign(user, secret, { expiresInMinutes: expires_in });

      // return res.status(200).send({
      //   success: true,
      //   message: 'Get your writing boots on.',
      //   token: token,
      //   user: user
      // });
    });

    // If not, fetch additional user information from linkedin

    // Search for user using returned email & update access_token (as it might have expired)

    // If not, register user using linkedin data

  });
}

function linkedInLoginCallback(req, res){
  // console.log("linkedinCallback"); 
  // console.log(req.body);
  // // Step 2a. Link user accounts.
  // if (req.headers.authorization) {
    
  //   // User.findOne({ 'data.id': body.user.id }, function(err, user) {
  //   //   console.log("USER FOUND!");

  //   //   // Grabbing the Bearer token
  //   //   var token = req.headers.authorization.split(' ')[1];
  //   //   var payload = jwt.decode(token, SECRET);

  //   //   // Return the user
  //   //   return res.send({ token: token, user: user });
  //   // });

  // } 
}


module.exports = {
  signup: signup,
  login: login,
  linkedInLogin: linkedInLogin,
  linkedInLoginCallback: linkedInLoginCallback
}