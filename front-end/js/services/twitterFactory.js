(function(){
  angular.module('Twitzon')
    .factory('TwitterFactory', TwitterFactory);

  TwitterFactory.$inject = ['$resource'];

  function TwitterFactory($resource){
    var self = this;

    self.getData = function(screen_name, user){
      var url = 'http://localhost:3000/api/twitterData/:screen_name';

      var res = $resource( url,{'get': { method: 'GET' }});
      
      res.get({screen_name: screen_name}, function(data){
        user.twitterData = data;
      })
    } 

    return self;
  }

})();