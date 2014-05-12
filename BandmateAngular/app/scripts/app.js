'use strict';

var App = angular.module('bandmateProjectApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'restangular', 'siyfion.sfTypeahead']);

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

App.config(['RestangularProvider', function(RestangularProvider){
  RestangularProvider.setBaseUrl('http://localhost:1337');
  RestangularProvider.setRestangularFields({
    id: '_.id.$oid'
  });
}]);
