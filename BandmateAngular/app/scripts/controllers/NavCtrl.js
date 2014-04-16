'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, AuthService) {

	$scope.user = [];

	$scope.user.loggedIn = AuthService.isLoggedIn();

	console.log('logged in:', $scope.user.loggedIn);

});