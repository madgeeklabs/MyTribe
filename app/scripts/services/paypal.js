/*
angular.module('MyTribeApp', ['ngResource' ])
    .factory('Message', ['$resource', function($resource){
        var urlApi = '/api/v2/me/conversations/:chatUserId/messages/:msgId';
        var resource = $resource(urlApi, {msgId:'@id', access_token:'@access_token'}, { 'get': { method: 'GET', isArray: true, params: { ll:'0,0' }  }});
        return resource;
    }]);

    a  = Message.get({msgId:1010,chatUSerId:231321});
    b  = Message.get({msgId:1010,chatUSerId:231321});
    '/api/v2/me/conversations/2131321/messages/1000' //{ ll:'0,0' }

    a.$promise.then(function(result){console.log(result)})

    a.$promise.then(b.$promise)
*/

/*
'use strict';

angular.module('MyTribeApp', ['ngResource'])
  .factory('PayPalSrvc', function($http) {
    var results = [];

    function find(term) {
        $http.get('/json/search').success(function(data) {
            results = data.results;
        });
    }

    //public API
    return {
            results: results,
            find: find
    };
});*/