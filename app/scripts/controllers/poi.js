'use strict';

angular.module('MyTribeApp')
    .controller('PoiCtrl', function ($scope, $routeParams, Paypal) {
        $scope.poiId = $routeParams.poiId;

        $scope.payPalCharge = function(){
            Paypal.charge({
                amount: {
                    currency: 'USD',
                    total: '9.00'
                },
                description: 'This is the payment description.'
            });
        };
    });
