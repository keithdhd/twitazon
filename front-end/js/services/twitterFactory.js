(function(){
  angular.module('Twitzon')
    .factory('TwitterFactory', TwitterFactory);

  TwitterFactory.$inject = ['$resource'];

  function TwitterFactory($resource){
    var url = 'http://localhost:3000/api/twitterData/:screen_name';

   return $resource( url, {screen_name: 'KDHDouglas'},{
      'get': { method: 'GET' }
    });
  }

})();

