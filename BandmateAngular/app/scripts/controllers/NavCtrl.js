'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location) {

	console.log('nav', AuthService.isLoggedIn());
	$scope.loggedIn = AuthService.isLoggedIn();

	$scope.submit = function() {
		console.log('meow');
		var encoded = Base64.encode($scope.login.username + ':' + $scope.login.password);
		console.log(encoded);

		$http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
			success(function(data, status, headers, config){
				console.log(data);
				if (data.message === 'login successful'){
					AuthService.setLoggedIn($scope.login.username, encoded);
					console.log('nav ctrl:', AuthService.isLoggedIn());
					$location.path('/profile/1');
					$scope.loggedIn = AuthService.isLoggedIn();
				}else{
					alert('Invalid Username or Password!');
				}
			});
	};

	$scope.logout = function(){
		AuthService.setloggedOut();
		$scope.loggedIn = AuthService.isLoggedIn();
		console.log('logout nav:', $scope.loggedIn);
		$location.path('/');
	};

});