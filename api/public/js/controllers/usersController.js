(function(){
  angular
  .module('Twitzon')
  .controller('UsersController', UsersController)

  UsersController.$inject = ['User','TokenService', 'APP_NAME', 'TwitterFactory', '$location', '$auth'];

  function UsersController(User, TokenService, APP_NAME, TwitterFactory, $location, $auth) {
    var self = this;

    self.all              = [];
    self.user             = {};
    self.screenNameSearch = '';
    self.APP_NAME         = APP_NAME; 

  self.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function(response){
      console.log(response);
    })
  };

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    // Set local user
    if(token) { console.log(res); self.user=res.user; }
    self.message =  res.message ? res.message : null;
  }

  self.linkedInLogin = function(){
    User.linkedInLogin();
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
    $location.path("/authorize");
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  self.getTwitterData = function(){
    var search_string; 
    if(self.screenNameSearch)
      search_string = self.screenNameSearch;
    else
      search_string = self.user.twitterHandle;
    
    TwitterFactory.getData(search_string, setTwitterData);
    TwitterFactory.getTimeline(search_string, setTimeLine);
  } 

  function setTwitterData(twitterData){
    self.user.twitterData = processTwitterData(twitterData);
    console.log(twitterData);
  }

  function setTimeLine(twitterData){
    console.log(twitterData);
    for (var i = 0; i < twitterData.length; i++) {
      twitterData[i].created_at = new Date(twitterData[i].created_at);
      twitterData[i].created_at = twitterData[i].created_at.toDateString();
    };

    self.user.latestTweets = twitterData;
  }

  function processTwitterData(twitterData){
    var returnData = twitterData;

    var bookTypes = ['spy', 'thriller', 'romance'];

    returnData.bookType   = bookTypes[Math.floor(Math.random() * 3)];
    returnData.created_at = new Date(twitterData.created_at).getFullYear();

    console.log(returnData.created_at);

    // Set the price
    returnData.price = twitterData.statuses_count / 100; 

    // Set the book cover image

    // Set the book book-cover-author class

    // Set the book book-cover-title class

    // Set the book book-cover-subtitle class

    return returnData;
  }

  // Load user only if you are logged in!
  if (self.isLoggedIn()) {
    self.user = TokenService.parseJwt();
  }

  return self;
};
})();