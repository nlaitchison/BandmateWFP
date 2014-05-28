'use strict';

/*global App*/

App.controller('LandingCtrl', function ($scope, $http) {

	$scope.users = '';

	$http({method: 'GET', url: 'http://localhost:1337/users/'}).
			success(function(data, status, headers, config) {
			  // this callback will be called asynchronously
			  // when the response is available

			  $scope.users = data;
			  console.log('results normal', $scope.results);

			}).
			error(function(data, status, headers, config) {
			  // called asynchronously if an error occurs
			  // or server returns response with an error status.
			});


});