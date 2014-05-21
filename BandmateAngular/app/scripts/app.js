'use strict';

var App = angular.module('bandmateProjectApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'restangular', 'siyfion.sfTypeahead', 'flow']);

App.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'LandingCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/profile/:id', {
        templateUrl: 'views/userView.html',
        controller: 'UserViewCtrl',
        resolve: {
          user: ['Restangular', '$route', function(Restangular, $route) {
              return Restangular.one('users', $route.current.params.id).get();
          }],
          videos: ['Restangular', '$route', function(Restangular, $route) {
              return Restangular.one('videos', $route.current.params.id).get();
          }]
        }
      })
      .when('/studio', {
        templateUrl: 'views/studio.html',
        controller: 'StudioCtrl'
      })
      .when('/account', {
        templateUrl: 'views/userEdit.html',
        controller: 'UserEditCtrl'
      })
      .when('/messages', {
        templateUrl: 'views/message.html',
        controller: 'MessageCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  App.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
  }]);

App.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div class="video_box"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
      scope.$watch('code', function (newVal) {
        if (newVal) {
          scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
        }
      });
    }
  };
});

App.filter('exact', function(){
  return function(items, match){
    var matching = [], matches, falsely = true;

    // Return the items unchanged if all filtering attributes are falsy
    angular.forEach(match, function(value, key){
      falsely = falsely && !value;
    });
    if(falsely){
      return items;
    }

    angular.forEach(items, function(item){ // e.g. { title: "ball" }
      matches = true;
      angular.forEach(match, function(value, key){ // e.g. 'all', 'title'
        if(!!value){ // do not compare if value is empty
          matches = matches && (item[key] === value);
        }
      });
      if(matches){
        matching.push(item);
      }
    });
    return matching;
  };
});

// directive to check if the enter key has been pressed
// using for search field
App.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind('keydown keypress', function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });
        event.preventDefault();
      }
    });
  };
});

App.config(['RestangularProvider', function(RestangularProvider){
  RestangularProvider.setBaseUrl('http://localhost:1337');
  RestangularProvider.setRestangularFields({
    id: '_.id.$oid'
  });
}]);
