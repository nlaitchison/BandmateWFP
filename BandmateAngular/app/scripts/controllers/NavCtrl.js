'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location) {

	console.log('nav', AuthService.isLoggedIn());
	$scope.loggedIn = AuthService.isLoggedIn();

	$scope.submit = function() {
		var encoded = Base64.encode($scope.login.username + ':' + $scope.login.password);

		$http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
			success(function(data, status, headers, config){
				if (data.message === 'login successful'){
					AuthService.setLoggedIn($scope.login.username, encoded, data.user);
					console.log('nav ctrl:', AuthService.isLoggedIn());
					$location.path('/edit/' + data.user.id);
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