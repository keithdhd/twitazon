(function() {
  'use strict';

  angular
  .module('Twitzon', ['angular-jwt',  'ngResource', 'ngMaterial', 'ngMessages', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .constant('APP_NAME', 'Twitzon')
  .config(function($httpProvider, $stateProvider, $mdThemingProvider, $urlRouterProvider) {
    
    $httpProvider.interceptors.push('authInterceptor');

    //Let's configure our color theme!
    $mdThemingProvider.theme('default')
      .primaryPalette('amber')
      .accentPalette('grey')

    // If a route other than status is requested,
    // go to the auth route
    $urlRouterProvider.otherwise('/authorize');

    $stateProvider
      .state('authorize', {
        url: '/authorize',
        templateUrl: './js/views/authorize.html'
      });
  });
})();