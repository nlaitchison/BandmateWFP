'use strict';

var App = angular.module('bandmateProjectApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

App.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
