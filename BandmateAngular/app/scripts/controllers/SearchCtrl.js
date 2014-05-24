'use strict';

/*global App*/

App.controller('SearchCtrl', function ($scope, Restangular, AuthService, $cookieStore, $filter, $http) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.filter = '';
	$scope.savedFilter = 'false';

	if($scope.loggedIn === true){
		// get user from db
		Restangular.one('users', userId).get().then(function(u){

			// set user for posting to db later
			$scope.user = u;

			// if the user has a filter saved
			if(u.filter !== null){
				//set filter
				$scope.filter = u.filter;
				$scope.savedFilter = 'true';
			}

		});
	}

	// when the user clicks save filter button
	$scope.saveFilter = function() {

		$scope.user.filter = $scope.filter;

		console.log('saveFilter');

		// update the user data
		$scope.user.put().then(function(){});

	};

	// when the user clicks the use once button
	$scope.filterResults = function(){

		console.log($scope.filter);

		console.log('useOnce');
		// users/search?lat=-11&lng=11
		// var searchModel={
		// 	lat: '-11',
		// 	lng: '11',
		// 	position: 'drummer',
		// 	name: 'kyle'
		// }

		// if the filter has a location set, then get their lng and lat
		if($scope.filter.city && $scope.filter.state){
			console.log('working');

			// set url for geocoding request
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.filter.city +','+'+'+ $scope.filter.state +'&sensor=true_or_false&key=AIzaSyBbKDdBIm2VtMBr5Xdq1slh0IU39dm33tM';

			// call to google geocoding api to get lng and lat
			$http({method: 'GET', url: url}).success(function(data, status, headers, config) {

				// set filter lat and lng
	      		$scope.filter.lat = data.results[0].geometry.location.lat;
	      		$scope.filter.lng = data.results[0].geometry.location.lng;

	      		$http({method: 'GET', url: 'http://localhost:1337/search/advance', params: $scope.filter}).
					success(function(data, status, headers, config) {
					  // this callback will be called asynchronously
					  // when the response is available

					  $scope.results = data;
					  console.log('results near', $scope.results);

					}).
					error(function(data, status, headers, config) {
					  // called asynchronously if an error occurs
					  // or server returns response with an error status.
					});


	    	}).
	    	error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    	});
		}else{
			// update the user data
			// $scope.user.put().then(function(){});

			$http({method: 'GET', url: 'http://localhost:1337/search/advance', params: $scope.filter}).
				success(function(data, status, headers, config) {
				  // this callback will be called asynchronously
				  // when the response is available

				  $scope.results = data;
				  console.log('results normal', $scope.results);

				}).
				error(function(data, status, headers, config) {
				  // called asynchronously if an error occurs
				  // or server returns response with an error status.
				});

		}

		// Restangular.all('users').getList("search", searchModel).then(function(u){

	 //    	$scope.results = u;

	 //    	// $scope.results = $filter('filter')(u, {accountType: {'instructor': 'true'}});

	 //    });

	 //    $http({method: 'GET', url: 'http://localhost:1337/location/near', params:searchModel}).
	 //    success(function(data, status, headers, config) {
	 //      // this callback will be called asynchronously
	 //      // when the response is available

	 //      console.log(data);

	 //    }).
	 //    error(function(data, status, headers, config) {
	 //      // called asynchronously if an error occurs
	 //      // or server returns response with an error status.
	 //    });



	};

	// when the user clicks the filter button
	$scope.clearFilters = function(){

		console.log('clearFilters');

		$scope.filter = '';
		$scope.results = '';

	};


	// ------------------------ Type Ahead Instruments ------------------------------

	// instantiate the bloodhound suggestion engine for instruments
	var instruments = new Bloodhound({
	datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.i); },
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	local: [
		{ i: 'Guitar' },
		{ i: 'Electric Guitar' },
		{ i: 'Acoustic Guitar' },
		{ i: 'Bass Guitar' },
		{ i: 'Drums' },
		{ i: 'Keyboard' }
		]
	});

	instruments.initialize();

	$scope.iDataset = {
		displayKey: 'i',
		source: instruments.ttAdapter()
	};

	$scope.instruments = [];
	$scope.filter.instruments = null;


	// ------------------------ Type Ahead Genres ------------------------------

	// instantiate the bloodhound suggestion engine for instruments
	var genres = new Bloodhound({
	datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.g); },
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	local: [
		{ g: 'Punk Rock' },
		{ g: 'Pop Punk' },
		{ g: 'Post-Hardcore' },
		{ g: 'Hardcore' }
		]
	});

	genres.initialize();

	$scope.gDataset = {
		displayKey: 'g',
		source: genres.ttAdapter()
	};

	$scope.genres = [];
	$scope.filter.genres = null;

	// Typeahead options object
	$scope.exampleOptions = {
		highlight: true
	};


});