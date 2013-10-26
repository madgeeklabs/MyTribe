'use strict';

angular.module('MyTribeApp')
    .controller('MainCtrl', function ($scope, Pois) {
        // lista los pois
        $scope.pois = Pois;

        // añade un poi
        // Pois.add(
        //     {
        //         //objeto poi a enviar
        //     } , function() {
        //         // callback
        //     }
        // );
    });