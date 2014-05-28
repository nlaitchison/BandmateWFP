'use strict';

/*global App*/

App.controller('SearchCtrl', function ($scope, Restangular, AuthService, $cookieStore, $filter, $http, $location) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.filter = '';

	var c = $cookieStore.get('filter');
	console.log('cookie', c);
	if(c != null){
		$scope.filter = c;
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

		if($scope.filter.instrument === '') $scope.filter.instrument = null;
		if($scope.filter.genre === '') $scope.filter.genre = null;
		if($scope.filter.musician === '') $scope.filter.musician = null;
		if($scope.filter.band === '') $scope.filter.band = null;
		if($scope.filter.instructor === '') $scope.filter.instructor = null;
		if($scope.filter.commitment === '') $scope.filter.commitment = null;
		if($scope.filter.availability === '') $scope.filter.availability = null;
		if($scope.filter.gigsPlayed === '') $scope.filter.gigsPlayed = null;
		if($scope.filter.gender === '') $scope.filter.gender = null;

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

		$cookieStore.put('filter', $scope.filter);
		var c = $cookieStore.get('filter');
		console.log('cookie', c);
	};

	// when the user clicks the filter button
	$scope.clearFilters = function(){

		console.log('clearFilters');

		$scope.filter = '';
		$scope.results = '';
		$cookieStore.put('filter', '');

	};

	//when landing search is submitted
	$scope.toSearch = function(filter){
		$location.path('/search');
		$cookieStore.put('filter', filter);
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