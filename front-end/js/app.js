angular
  .module('Twitzon', ['angular-jwt', 'ngResource'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })