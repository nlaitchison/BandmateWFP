'use strict';

/*global App*/

App.controller('StudioCtrl', function ($scope, Restangular, $routeParams, $location, AuthService, $cookieStore) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	var user = $cookieStore.get('userId');
	console.log(user);

	//get user studio from db
	Restangular.one('studios', user).get().then(function(s){

		//set scope to db
		$scope.studio = s;

	});

	// when the account_info form is submmitted
	$scope.addRemoveStudio = function() {

		if($scope.studio.following.length !== 0){
			for (var i=0;i<$scope.studio.following.length;i++)
			{
				if($scope.studio.following[i] === $routeParams.id){
					console.log('match');
					$scope.studio.following.push({'userId' : $routeParams.id});
				}else{
					console.log('no match');
					$scope.studio.following.push({'userId' : $routeParams.id});
				}
			}
		}else{
			console.log('meow');
			$scope.studio.following.push({'userId' : $routeParams.id});
		}

		console.log('addRemoveStudio');

		// update the user studio data
		$scope.studio.put().then(function(){
		});

    };

});