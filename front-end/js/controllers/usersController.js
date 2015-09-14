(function(){
  angular
  .module('Twitzon')
  .controller('UsersController', UsersController)

  UsersController.$inject = ['User','TokenService', 'APP_NAME'];

  function UsersController(User, TokenService, APP_NAME) {
    var self = this;

    self.all      = [];
    self.user     = {};
    self.APP_NAME = APP_NAME; 

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    // Set local user
    if(token) { console.log(res); self.user=res.user }
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
    self.user = {};
    self.message = null;
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  self.getUsers = function() {
    self.all = User.query();
  }

  self.getTwitterData = function(){
    console.log("Getting twiter data for " + self.user.twitterHandle);
    //TwitterFactory.getData(user.twitterHandle);
  }

  // Load users only if you are logged in!
  if (self.isLoggedIn()) {
    self.getUsers();
    self.user = TokenService.parseJwt();
  }

  return self;
};
})();