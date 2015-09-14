var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var authenticationController = require('../controllers/authenticationController');
var usersController          = require('../controllers/usersController');
var twitterController        = require('../controllers/twitterController');

router.post('/authorize', authenticationController.login);
router.post('/join', authenticationController.signup);
router.get('/twitterData/:screen_name', twitterController.getData);

router.route('/users')
  .get(usersController.indexUsers)
  .post(usersController.createUser)

router.route('/users/:id')
  .get(usersController.showUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;