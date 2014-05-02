'use strict';

/*global App*/

App.controller('StudioCtrl', function ($scope, Restangular, $routeParams, $location, AuthService, $cookieStore) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	var user = $cookieStore.get('userId');

	$scope.exists = false;

	//get user studio from db
	Restangular.one('studios', user).get().then(function(s){

		//set scope to db
		$scope.studio = s;

		if($scope.studio.following.length > 0){
			console.log('run loop');
			for (var i=0;i<$scope.studio.following.length;i++)
			{
				if($scope.studio.following[i].userId === $routeParams.id){
					$scope.exists = true;
					$scope.position = i;
					// console.log($scope.inStudio);
					break;
				}
			}
		}else{
			console.log('dont run');
		}

		console.log('get studio:', $scope.exists, $scope.position);

	});

	// when the account_info form is submmitted
	$scope.addRemoveStudio = function() {

		if($scope.exists === false){
			$scope.studio.following.push({'userId' : $routeParams.id});
			$scope.exists = true;
			$scope.position = $scope.studio.following.length - 1;
			console.log('add:', $scope.exists, $scope.position);

			// update the user studio data
			$scope.studio.put().then(function(){
			});

		}else{
			$scope.studio.following.splice($scope.position, 1);
			$scope.exists = false;
			$scope.position = '';
			console.log('remove:', $scope.exists, $scope.position);

			// update the user studio data
			$scope.studio.put().then(function(){
			});
		}

		console.log('addRemoveStudio');



    };

    		// if($scope.studio.following.length !== 0){

		// 	var exists = false;

		// 	for (var i=0;i<$scope.studio.following.length;i++)
		// 	{
		// 		if($scope.studio.following[i].userId === $routeParams.id){
		// 			console.log('remove');
		// 			exists = true;
		// 			$scope.studio.following.splice(i, 1);
		// 			break;
		// 		}
		// 	}

		// 	if(exists === false){
		// 		console.log('add');
		// 		$scope.studio.following.push({'userId' : $routeParams.id});
		// 	}

		// }else{
		// 	console.log('add');
		// 	$scope.studio.following.push({'userId' : $routeParams.id});

		// }

});