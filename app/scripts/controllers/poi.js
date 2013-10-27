'use strict';

angular.module('MyTribeApp')
    .controller('PoiCtrl', function ($scope, $routeParams, Paypal) {
        $scope.poiId = $routeParams.poiId;

        $scope.payPalCharge = function(){
            Paypal.charge({
                amount: {
                    currency: 'EUR',
                    total: '10.00'
                },
                description: 'Descripción del pago.'
            }).
            $promise.then(function(result){
                window.location.href = result.redirect;
            });
        };
    });
