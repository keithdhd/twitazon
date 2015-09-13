var User = require('../models/user');

function indexUsers(req, res){
  User.find(function(error, users){
    if (error) return res.status(404).json({message: "Gnarly dude! You can't access this."});
    return res.status(200).send(users);
  });
}

function createUser(req, res){
  var user = new User(req.body);
  user.save(function(error){
    if (error) return res.status(403).send({message: "Sorry, you can't just create a user like that."})
    return res.status(200).send(user);
  });
}

function showUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user){
    if (error) return res.status(404).send({message: "Ain't no users with that name."})
    return res.status(200).send(user);
  });
}

function updateUser(req, res){
  var id = req.params.id;
  User.findById({_id: id}, function(error, user) {
    if (error) return res.status(404).send({message: "Oops! No user with that name"})

    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;

    user.save(function(error) {
      if (error) return res.status(500).send({message: "There seems to be some error in updating your user."})
      return res.status(200).send(user);
    });
  });
}

function deleteUser(req, res){
  var id = req.params.id;
  User.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'Oops! No user with that name.'})
    res.status(204);
  });
  return;
}

module.exports = {
  indexUsers: indexUsers,
  createUser: createUser,
  showUser: showUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}