'use strict';

angular.module('MyTribeApp')
    .controller('MainCtrl', function ($scope, Pois, Paypal) {
        // lista los pois
        $scope.pois = Pois;
        
        $scope.postToNode = function(){
            console.log('almost posting to niode!');
           Paypal.save({lala:'caca'}); 
        };

        // añade un poi
        Pois.add(
            {
                //objeto poi a enviar
            } , function() {
                // callback
            }
        );
    });
