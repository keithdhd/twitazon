(function() {
  'use strict';

  angular
  .module('Twitzon', ['angular-jwt',  'ngResource', 'ngMaterial', 'ngMessages', 'ui.router', 'satellizer'])
  .constant('API', 'http://localhost:3000/api')
  .constant('APP_NAME', 'Twitazon')
  .config(function($httpProvider, $stateProvider, $mdThemingProvider, $urlRouterProvider, $authProvider) {
    
    $authProvider.linkedin({
      clientId: '77zc3fbmuqmagq',
      url: 'http://127.0.0.1:3000/api/auth/linkedin',
      authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
      redirectUri: 'http://127.0.0.1:3000/api/auth/linkedin',
      requiredUrlParams: ['state'],
      scope: ['r_emailaddress', 'r_fullprofile'],
      scopeDelimiter: ' ',
      state: 'STATE',
      type: '2.0',
      popupOptions: { width: 527, height: 582 }
    });

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
      })
      .state('display', {
        url: '/display',
        templateUrl: './js/views/display.html'
      })
  });
})();