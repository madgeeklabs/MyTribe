'use strict';

angular.module('MyTribeApp')
    .controller('PoiCtrl', function ($scope, $routeParams, Paypal) {
        $scope.poi = {
            id: $routeParams.poiId,
            name: "L'Hastilla skatepark",
            description: "Indoor skatepark",
            amount: "19.00"
        }

        $scope.payPalCharge = function(){
            Paypal.charge({
                amount: {
                    currency: 'USD',
                    total: '19.00'
                },
                description: "Ticket for l'Hastilla skatepark."
            }).
            $promise.then(function(result){
                window.location.href = result.redirect;
            });
        };
    });
