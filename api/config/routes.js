var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var authenticationController = require('../controllers/authenticationController');
var usersController = require('../controllers/usersController');

router.post('/authorize', authenticationController.login);
router.post('/join', authenticationController.signup);

router.route('/users')
  .get(usersController.indexUser)
  .post(usersController.createUser)

router.route('/agents/:id')
  .get(usersController.showUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router;