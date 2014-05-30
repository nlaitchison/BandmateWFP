'use strict';

/*global App*/

App.controller('NewsfeedCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore, $http) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.newsfeed = [];

	$scope.order = '-timeStamp';

	var init = function(){

		//get user studio from db
		Restangular.one('studios', userId).get().then(function(s){

			if(s.following.length > 0){

				// for each user in the studio
				for (var i=0;i<s.following.length;i++)
				{
					// get their user data from the users db
					Restangular.one('users', s.following[i].userId).get().then(function(u){
						// push it to the scope
						// console.log(u);
						// get their user data from the users db
						Restangular.one('newsfeed', u.id).get().then(function(n){
							// push it to the scope
							// console.log(n);
							for (var i=0;i<n.changes.length;i++)
							{
								var obj = { 'userId': u.id, 'userName': u.name, 'userPic' : u.profileImg, 'gender' : u.gender, 'timeStamp': n.changes[i].timeStamp, updates: n.changes[i].updates};
								$scope.newsfeed.push(obj);
							}
						});

					});
				}
			}else{
				console.log('dont run');
			}
		});

		Restangular.one('users', userId).get().then(function(u){

			if(u.city && u.state){

				var filter = {
					'city' : u.city,
					'state' : u.state,
				};

				$http({method: 'GET', url: 'http://localhost:1337/search/advance', params: filter}).
				success(function(data, status, headers, config) {
				  // this callback will be called asynchronously
				  // when the response is available

				  $scope.nearbyUsers = data;
				  console.log('results', $scope.results);

				}).
				error(function(data, status, headers, config) {
				  // called asynchronously if an error occurs
				  // or server returns response with an error status.
				});
			}
		});
	};

	if(!$scope.loggedIn){
        $location.path('/');
    }else{
    	init();
    }


});