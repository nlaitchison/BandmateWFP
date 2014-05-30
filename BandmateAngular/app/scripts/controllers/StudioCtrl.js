'use strict';

/*global App*/

App.controller('StudioCtrl', function ($scope, Restangular, $routeParams, $location, AuthService, $cookieStore) {

	// make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var user = $cookieStore.get('userId');

	// set var for add/remove from studio function
	$scope.exists = false;

	var init = function(){
		//get user studio from db
		Restangular.one('studios', user).get().then(function(s){

			//set scope to db
			$scope.studio = s;

			//set scope for studioUsers
			$scope.studioUsers = [];

			// if current user has users in studio
			if($scope.studio.following.length > 0){

				// for each user in the studio
				for (var i=0;i<$scope.studio.following.length;i++)
				{
					// get their user data from the users db
					Restangular.one('users', $scope.studio.following[i].userId).get().then(function(u){
						// push it to the scope
						$scope.studioUsers.push(u);
					});

					// check to see if the profile page the current user is viewing is in the studio
					if($scope.studio.following[i].userId === $routeParams.id){
						$scope.exists = true;
						$scope.position = i;
						break;
					}
				}
			}else{
				console.log('dont run');
			}

			console.log('get studio:', $scope.exists, $scope.position);

		});
	};

	if(!$scope.loggedIn){
        $location.path('/');
    }else{
    	init();
    };


});