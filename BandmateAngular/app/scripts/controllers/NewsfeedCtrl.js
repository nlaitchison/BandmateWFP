'use strict';

/*global App*/

App.controller('NewsfeedCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore, $http) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.newsfeed = [];

	$scope.order = '-timeStamp';

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

	// $scope.getSC = function(url){
	// 	$.get(
	// 		'http://api.soundcloud.com/resolve.json?url=' + url + '&client_id=dfc5f1fa84c13d3d8888d1fb9c094f89',
	// 		function (result) {

	// 			$('.user_audio').html('<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' +  result.uri + '&amp;color=2a258e&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');

	// 			console.log(result.uri);
	// 		}
	// 	);
	// };

});