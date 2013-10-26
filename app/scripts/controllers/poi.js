'use strict';

angular.module('MyTribeApp')
  .controller('PoiCtrl', function ($scope, $routeParams) {
    $scope.poiId = $routeParams.poiId;
  });