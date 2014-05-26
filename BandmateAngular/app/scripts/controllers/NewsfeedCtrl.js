'use strict';

/*global App*/

App.controller('NewsfeedCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore, $http) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.newsfeed = [];

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
							var obj = { 'userId': u.id, 'userName': u.name, 'userPic' : u.profileImg, 'timeStamp': n.changes[i].time, 'type': n.changes[i].type, 'change': n.changes[i].change};
							$scope.newsfeed.push(obj);
						}
					});

				});
			}
		}else{
			console.log('dont run');
		}
	});

});