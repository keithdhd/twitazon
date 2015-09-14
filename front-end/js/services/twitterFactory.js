(function(){
  angular.module('Twitzon')
    .factory('TwitterFactory', TwitterFactory);

  TwitterFactory.$inject = ['$resource'];

  function TwitterFactory($resource){
    var self = this;

    self.getData = function(screen_name){
      var url = 'http://localhost:3000/api/twitterData/:screen_name';

      $resource( url, {screen_name: screen_name},{
                'get': { method: 'GET' }
                });
    } 

    return self;
  }

})();

