'use strict';

var App = angular.module('bandmateProjectApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'restangular']);

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
        templateUrl: 'views/profile.html',
        controller: 'UserViewCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/editProfile.html',
        controller: 'UserEditCtrl'
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
      console.log('here');
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
