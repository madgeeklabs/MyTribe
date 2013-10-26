'use strict';

angular.module('MyTribeApp')
  .controller('PoiCtrl', function ($scope, angularFire, $routeParams, $http) {
    $scope.poiId = $routeParams.poiId;
  });