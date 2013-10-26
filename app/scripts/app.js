'use strict';

angular.module('MyTribeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
