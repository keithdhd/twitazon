(function(){
  angular.module('Twitzon')
    .factory('TwitterFactory', TwitterFactory);

  TwitterFactory.$inject = ['$resource', '$location'];

  function TwitterFactory($resource, $location, $localStorage){
    var self = this;
    self.twitterData = {};

    self.getData = function(screen_name, callback){
      var url = 'http://localhost:3000/api/twitterData/:screen_name';

      var res = $resource( url, {'get': { method: 'GET' }});
      
      res.get({screen_name: screen_name}, function(data){
        callback(data);
        //$location.path("/display");
      });

    } 

    self.getTimeline = function(screen_name, callback){
      var url = 'http://localhost:3000/api/timeline/:screen_name';

      var res = $resource( url, {'query': { method: 'GET', isArray:true }});
      
      res.query({screen_name: screen_name}, function(data){
        callback(data);
        $location.path("/display");
      });

    } 

    return self;
  }

})();