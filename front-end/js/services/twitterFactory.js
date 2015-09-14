(function(){
  angular.module('Twitzon')
    .factory('TwitterFactory', TwitterFactory);

  TwitterFactory.$inject = ['$resource'];

  function TwitterFactory($resource){
    var url = '';

    var TwitterResource = $resource(url, {id: '@_id'}, {
        'getData': { method:'GET' }
      });

    return TwitterResource;
  }

})();

