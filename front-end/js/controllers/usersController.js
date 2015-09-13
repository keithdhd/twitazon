(function(){
  angular
  .module('Twitzon')
  .controller('UsersController', UserController)

  UserController.$inject = ['User','TokenService'];

  function UserController(User, TokenService) {
    var self = this;

    self.all   = [];
    self.user  = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log(res); }
    self.message =  res.message ? res.message : null;
  }

  self.authorize = function() {
    User.authorize(self.user, showMessage);
  }

  self.join = function() {
    User.join(self.user, showMessage);
  }

  self.logout = function() {
    TokenService.removeToken && TokenService.removeToken();
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  self.getUsers = function() {
    self.all = User.query();
  }

  // Load users only if you are logged in!
  if (self.isLoggedIn()) {
    self.getUsers();
    self.user = TokenService.parseJwt();
  }

  return self;
};
})();