'use strict';

/*global App*/

App.controller('StudioCtrl', function ($scope, Restangular, $routeParams, $location, AuthService, $cookieStore) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	var user = $cookieStore.get('userId');

	//get user studio from db
	Restangular.one('studio', user).get().then(function(s){

		//set scope to db
		$scope.studio = s;

	});

	// when the account_info form is submmitted
	$scope.addRemoveStudio = function() {

		console.log('addRemoveStudio');

		// // update the user data
		// $scope.user.put().then(function(){
		// });

    };

});