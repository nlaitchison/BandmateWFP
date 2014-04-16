'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, AuthService) {

	$scope.user = [];
	$scope.loggedIn = AuthService.isLoggedIn();
	console.log($scope.loggedIn);

});