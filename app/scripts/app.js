'use strict';

var myTribeApp = angular.module('MyTribeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'google-maps'
]).
  factory('Beats', function(angularFireCollection) {
    return angularFireCollection(new Firebase('https://elchudi-beats.firebaseio.com/'));
  }).
  factory('Pois', function(angularFireCollection) {
    return angularFireCollection(new Firebase('https://mitribu-pois.firebaseio.com/'));
  }).
  factory('Tribes', function(angularFireCollection) {
    return angularFireCollection(new Firebase('https://mitribu-tribes.firebaseio.com/'));
  }).
  factory('Users', function(angularFireCollection) {
    return angularFireCollection(new Firebase('https://mitribu-users.firebaseio.com/'));
  }).
  factory('Paypal', ['$resource', function($resource){
      var resource = $resource('http://localhost:3000/',
        { /* Query params */ }, {
          charge: {method:'POST', params:{charge:true}
        }
      });
      return resource;
  }]).
  config(function ($routeProvider) {
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
