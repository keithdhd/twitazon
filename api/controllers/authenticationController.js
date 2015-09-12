var Agent    = require('../models/agent');
var jwt      = require('jsonwebtoken');
var passport = require('passport');
var secret   = require('../config/config').secret;

function signup(req, res, next) {
  passport.authenticate('local-signup', function(err, agent, info) {
    if (err) return res.status(500).send(err);
    if (!agent) return res.status(401).send({ error: 'User already exists!' });

    var token = jwt.sign(agent, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({ 
      success: true,
      message: "There is no going back now.",
      token: token
    });
  })(req, res, next);
};

function login(req, res, next) {
  Agent.findOne({
    codename: req.body.codename
  }, function(err, agent) {
    if (err) return res.status(500).send(err);

    if (!agent) return res.status(403).send({ message: 'You seem to be mistaken, we have no agent with that identity.' });

    if (!agent.validPassword(req.body.password)) return res.status(403).send({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(agent, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: 'For your eyes only.',
      token: token
    });
  });
};

module.exports = {
  signup: signup,
  login: login
}