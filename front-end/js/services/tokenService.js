angular
  .module('Twitzon')
  .service('TokenService', TokenService)

TokenService.$inject = ['$window' , 'jwtHelper']
function TokenService($window, jwtHelper) {

  var self = this;

  self.parseJwt = function() {
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
  }

  self.saveToken = function(token) {
    $window.localStorage['secret-handshake'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['secret-handshake'];
  }

  self.removeToken = function() {
    $window.localStorage.removeItem('secret-handshake');
  }

  self.isLoggedIn = function() {
    var token = self.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

}