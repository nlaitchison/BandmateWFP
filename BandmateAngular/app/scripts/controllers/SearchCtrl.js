'use strict';

/*global App*/

App.controller('SearchCtrl', function ($scope, Restangular, AuthService, $cookieStore, $filter, $http) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.filter = '';
	$scope.savedFilter = 'false';

	if($scope.loggedIn == true){
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

		console.log('useOnce');

		Restangular.all('users').getList().then(function(u){

	    	$scope.results = u;

	    	// $scope.results = $filter('filter')(u, {accountType: {'instructor': 'true'}});

	    });

	    $http({method: 'GET', url: 'http://localhost:1337/location/near'}).
	    success(function(data, status, headers, config) {
	      // this callback will be called asynchronously
	      // when the response is available

	      console.log(data);

	    }).
	    error(function(data, status, headers, config) {
	      // called asynchronously if an error occurs
	      // or server returns response with an error status.
	    });

	    console.log($scope.filter);

	};

	// when the user clicks the filter button
	$scope.clearFilters = function(){

		console.log('clearFilters');

		$scope.filter = '';

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