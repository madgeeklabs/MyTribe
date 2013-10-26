'use strict';

angular.module('MyTribeApp')
  .controller('MainCtrl', function ($scope, angularFire) {
    var ref = new Firebase("https://mitribu.firebaseio.com/");
    $scope.messages = [];
    angularFire(ref, $scope, "messages");
    $scope.addMessage = function(e) {
        console.log(e);
        // if (e.keyCode != 13) return;
        $scope.messages.push({from: $scope.name, body: $scope.msg});
        $scope.msg = "";
    }
  });
