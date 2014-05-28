'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location, $cookieStore) {

	// console.log('nav', AuthService.isLoggedIn());

	//set var for show and hide nav ul
	$scope.loggedIn = AuthService.isLoggedIn();

	var currentUserId = $cookieStore.get('userId');

	Restangular.one('users', currentUserId).get().then(function(u){

		//set scope to db
		$scope.currentUser = u;

	});

	// on login submit
	$scope.submit = function() {

		// encode for login
        var encoded = Base64.encode($scope.login.username + ':' + $scope.login.password);

        // login the user
        $http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
          success(function(data, status, headers, config){

            // if the user logged in
            if (data.message === 'login successful'){

				// set all the data for the user
				AuthService.setLoggedIn($scope.login.username, encoded, data.user);

				console.log('nav ctrl:', AuthService.isLoggedIn());

				// take user to account page
				$location.path('/account');

				// set scope var for nav show and hide ul
				$scope.loggedIn = AuthService.isLoggedIn();

				// get user from db to set scope for nav info
				Restangular.one('users', data.user.id).get().then(function(u){

					//set scope to db
					$scope.user = u;
					console.log($scope.user);

				});

            }else{
             	// alert('Invalid Username or Password!');
             	 $scope.loginErr = 'Invalid Username or Password!';
            }
          });
	};

	//on logout
	$scope.logout = function(){

		// call logout in authService
		AuthService.setloggedOut();

		//set var for show and hide nav ul
		$scope.loggedIn = AuthService.isLoggedIn();

		console.log('logout nav:', $scope.loggedIn);

		// take user back to landing page
		$location.path('/');
	};

});