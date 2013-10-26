'use strict';

var myTribeApp = angular.module('MyTribeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'google-maps'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/tribe/:tribeId', {
        templateUrl: 'views/tribe.html',
        controller: 'TribeCtrl'
      })
      .when('/poi/:poiId', {
        templateUrl: 'views/poi.html',
        controller: 'PoiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
