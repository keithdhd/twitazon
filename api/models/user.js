var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
  firstname     : { type: String },
  lastname      : { type: String },
  email         : { type: String, required: true, unique: true},
  password      : { type: String },
  twitterHandle : { type: String }
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      firstname: ret.firstname,
      lastname: ret.lastname,
      email: ret.email,
      twitterHandle: ret.twitterHandle
    };
    return returnJson;
  }
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);