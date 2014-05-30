'use strict';

/*global App*/

App.controller('NavCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location, $cookieStore, $sails) {

	// console.log('nav', AuthService.isLoggedIn());

	//set var for show and hide nav ul
	$scope.loggedIn = AuthService.isLoggedIn();
	console.log(AuthService.isLoggedIn());

	var currentUserId = $cookieStore.get('userId');

	// Restangular.one('users', currentUserId).get().then(function(u){

	// 	//set scope to db
	// 	$scope.currentUser = u;

	// });

	// check for new messages
    $sails.on('message', function(data) {

        console.log('New update received :: ', data);

        switch(data.model){

            case 'users':
                $scope.currentUser = data.data;

            case 'conversations':
	            if (data.verb === 'update') {
	                countMsgs();
	            }
            break;
        }

    });

	$sails.get('/users', {id : currentUserId})
	    .success(function(u) {

	      	//set scope to db
			$scope.currentUser = u;
			console.log($scope.user);

			countMsgs();

	    });

	function countMsgs(){

		$scope.msgNew = 0;

		$sails.get('/conversations', {participants : currentUserId})
	        .success(function(c) {

	            // set scope
	            $scope.conversations = c;


	            // get the user info for other participant
	            for (var i=0;i<c.length;i++) {

	                if(c[i].newMsg){
	                	$scope.msgNew++;
	                }

	                console.log($scope.msgNew);

	            }

	        });
	};

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

				// take user to newsfeed page
				$location.path('/newsfeed');

				// set scope var for nav show and hide ul
				$scope.loggedIn = AuthService.isLoggedIn();

				// get user from db to set scope for nav info
				// Restangular.one('users', data.user.id).get().then(function(u){

				// 	//set scope to db
				// 	$scope.user = u;
				// 	console.log($scope.user);

				// });

				$sails.get('/users', {id : data.user.id})
			        .success(function(u) {

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

	$scope.searchPage = function(){
		// $cookieStore.put('filter', $scope.filter);
		$location.path('/search');
	};

});