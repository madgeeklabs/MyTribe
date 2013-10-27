'use strict';

angular.module('MyTribeApp') 
.controller('MapController', function  ($scope, $timeout, $log, angularFire, Beats, Pois) {
    _ = window._;
    $scope.beats = Beats;
    $scope.pois = Pois;
    $scope.info = {dynamicMarkers:[]};
    //window.b = Beats
    // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
    google.maps.visualRefresh = true;

    var onMarkerClicked = function(marker){
        marker.showWindow = true;
        window.alert("Marker: lat: " + marker.latitude +", lon: " + marker.longitude + " clicked!!");
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
            dynamicPois: [],
            doUgly: true, //great name :)
            eventsCreateVenue: {
                click: function(mapModel, eventName, originalEventArgs){
                    console.log('create venue');
                    var e = originalEventArgs[0];
                    var poiSponsor = {coords:
                                    {latitude:e.latLng.lat(), longitude:e.latLng.lng()},
                                    amount:Math.floor(Math.random()*10000 )/100, name:'L\'hastilla Skatepark', description:'Skate park', showWindow: false };
                    Pois.add(poiSponsor, function(){
                      console.log('point added');
                    });
                
                }
            },
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    // 'this' is the directive's scope
                    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
                    var now = new Date();

			////////////////////////////////
			// MAPA 1 (clicks)
		    var pois = performClustering($scope.beats);
                    console.log('pot entontrado');
                    console.log(pois);
                    var p = pois[0];
                    _.each(pois,function(p){
                        if(_.filter($scope.pois, function(obj){return obj.coords.latitude == p.coords.latitude}).length == 0 ){
                            Pois.add({ coords: p.coords, showWindow: false, numberOfUsers:p.numberOfUsers }, function(){
                              console.log('point added');
                            });
                    
                        }
                    });

                    var e = originalEventArgs[0];
                    var dynamicMarkers = [];
                    var beat = {coords:
                                    {latitude:e.latLng.lat(), longitude:e.latLng.lng()},
                                    timestamp:now, user_id:555};
                    Beats.add(beat, function(){
                        console.log('beat adder');
                        $scope.showMap();
                        //$scope.map.infoWindow.show = true;
                        /*
                        _.each($scope.beats, function(beat){
                            if(beat && beat.coords){
                                dynamicMarkers.push({ latitude: beat.coords.latitude, longitude: beat.coords.longitude, showWindow: false });
                            }
                        });
                       _.each(dynamicMarkers,function(marker){
                            marker.closeClick = function(){
                                marker.showWindow = false;
                                $scope.$apply();
                            };
                            marker.onClicked = function(){
                                onMarkerClicked(marker);
                            };
                        });
                        */
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

    var poisShow = function(){
        $timeout(function(){
            console.log('hheeeeehooo');
            var dynamicPois = [];
              //$scope.map.infoWindow.show = true;
            _.each($scope.pois, function(poi){
                    console.log('poi');
                    console.log(poi);
                  if(poi && poi.coords){
                    dynamicPois.push({ latitude: poi.coords.latitude, longitude: poi.coords.longitude, showWindow: false });
                    }
              })   ;
             _.each(dynamicPois,function(marker){
                  marker.closeClick = function(){
                      marker.showWindow = false;
                      $scope.$apply();
                  };
                  marker.onClicked = function(){
                      onMarkerClicked(marker);
                  };
              });
              //debugger;
              $scope.map.dynamicPois = dynamicPois;
                console.log(dynamicPois.length);
              $scope.$apply();
                poisShow();
            }, 4000);
    };

    var markerArray = [];
    var map;
    var heatmap;

    $scope.showMap = function(){
        console.log('show map');
        var mapOptions = {
          center: new google.maps.LatLng(34.397, 0.644),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = map || new google.maps.Map(document.getElementById("map-canvas-basic"), mapOptions);
        _.each(markerArray, function(m){
            m.setMap(null);
        });
        if(heatmap){
            heatmap.setMap(null);
        }
        markerArray.length = 0;
        var taxiData = [];
        _.each($scope.beats, function(beat){
            taxiData.push(new google.maps.LatLng(String(beat.coords.latitude),String(beat.coords.longitude)));
        
        });
        var pointArray = new google.maps.MVCArray(taxiData);

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });
        heatmap.setMap(map);
        
        _.each($scope.pois, function(poi){
            console.log(poi);
            var ll = new google.maps.LatLng(String(poi.coords.latitude),String(poi.coords.longitude));
            var marker;
            if(poi.amount){
                marker = new google.maps.Marker({
                    position: ll,
                    map: map,
                    title: String(poi.numberOfUsers),
                    icon: "views/imgs/marker-premium.png"
                });
            
            }else{
                marker = new google.maps.Marker({
                    position: ll,
                    map: map,
                    title: String(poi.numberOfUsers),
                    icon: "views/imgs/marker.png"
                });
            }
            markerArray.push(marker);
        });
    
    };
    //google.maps.event.addDomListener(window, 'load', $scope.showMap);

    //heatShow();    
    //poisShow();

});
