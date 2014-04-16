'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, AuthService) {

	console.log('nav', AuthService.isLoggedIn());
	$scope.loggedIn = AuthService.isLoggedIn();

	$scope.logout = function(){
		AuthService.setloggedOut();
		$scope.loggedIn = AuthService.isLoggedIn();
		console.log('logout nav:', $scope.loggedIn);
	};

});