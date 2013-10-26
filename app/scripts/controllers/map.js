'use strict';

angular.module('MyTribeApp') 
.controller('MapController', function  ($scope, $timeout, $log, angularFire, Beats, Pois) {
    $scope.beats = Beats;
    $scope.pois = Pois;
    $scope.info = {dynamicMarkers:[]};
    //window.b = Beats
    // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
    google.maps.visualRefresh = true;

    var onMarkerClicked = function(marker){
        marker.showWindow = true;
        window.alert("Marker: lat: " + marker.latitude +", lon: " + marker.longitude + " clicked!!")
    };
    

    

    angular.extend($scope, {
        map: {
            showTraffic: true,
            showBicycling: false,
            showWeather: false,
            center: {
                latitude: 45,
                longitude: -73
            },
            options: {
              streetViewControl: false,
              panControl: false
            },
            zoom: 3,
            dragging: false,
            bounds: {},
            dynamicMarkers: [],
            pois:[],
            doUgly: true, //great name :)
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    // 'this' is the directive's scope
                    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
                    var now = new Date();

                    var e = originalEventArgs[0];
                    var dynamicMarkers = [];
                    var beat = {coords:
                                    {latitude:e.latLng.lat(), longitude:e.latLng.lng()},
                                    timestamp:now, user_id:555};
                    Beats.add(beat, function(){
                        console.log('beat adder');
                        //$scope.map.infoWindow.show = true;
                        _.each($scope.beats, function(beat){
                            console.log(beat);
                            //console.log(beat);
                            //console.log(beat.coords.latitude);
                            //console.log(beat.coords.longitude);
                            if(beat && beat.coords)
                                dynamicMarkers.push({ latitude: beat.coords.latitude, longitude: beat.coords.longitude, showWindow: false });
                        })   ;
                       _.each(dynamicMarkers,function(marker){
                            marker.closeClick = function(){
                                marker.showWindow = false;
                                $scope.$apply();
                            };
                            marker.onClicked = function(){
                                onMarkerClicked(marker);
                            };
                        });
                        //debugger;
                        $scope.map.dynamicMarkers = dynamicMarkers;
                        $scope.$apply();
                    });

                    if (!$scope.map.clickedMarker) {
                        $scope.map.clickedMarker = {
                            title: 'You clicked here',
                            latitude: e.latLng.lat(),
                            longitude: e.latLng.lng()
                        };
                    }
                    else {
                        $scope.map.clickedMarker.latitude = e.latLng.lat();
                        $scope.map.clickedMarker.longitude = e.latLng.lng();
                    }

                    $scope.$apply();
                }
            },
            infoWindow: {
                coords: {
                    latitude: 30,
                    longitude: -89
                },
                show: false
            },
            templatedInfoWindow: {
                coords: {
                    latitude: 60,
                    longitude: -95
                },
                show: true,
                templateUrl: 'templates/info.html',
                templateParameter: {
                    message: 'passed in from the opener'
                }
            },
        },
        toggleColor:function(color){
            return color === 'red' ? '#6060FB' : 'red';
        }

    });


    $scope.removeMarkers = function () {
        $log.info("Clearing markers. They should disappear from the map now");
        $scope.map.dynamicMarkers.length = 0;
        $scope.map.infoWindow.show = false;
        $scope.map.templatedInfoWindow.show = false;
        // $scope.map.infoWindow.coords = null;
    };

     $scope.$watch('map.doUgly', function (newValue, oldValue) {
        var json;
        if(newValue !== oldValue){
            if (newValue){
                json = {title:'Hi I am a Cluster!', gridSize:60, ignoreHidden:true,minimumClusterSize:2,
                    imageExtension:'png',imagePath:'http://localhost:3000/cluster',imageSizes:[72]};
            }
            else{
                json = {title:'Hi I am a Cluster!', gridSize:60, ignoreHidden:true,minimumClusterSize:2};
            }
            $scope.map.clusterOptions = json;
            $scope.map.clusterOptionsText = angular.toJson(json);
        }
    });


    $scope.onMarkerClicked = onMarkerClicked;

});
