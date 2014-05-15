'use strict';

/*global App*/

App.controller('UserEditCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore, $http) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	console.log(userId);

	// get user from db
	Restangular.one('users', userId).get().then(function(u){

		//set scope to db
		$scope.user = u;

		$scope.instruments = u.instruments;
		$scope.genres = u.genres;

	});

	// get video urls
	// var v = Restangular.all('videos');
	Restangular.one('videos', userId).get().then(function(v){

		//set scope to db
		$scope.videos = v;

		if($scope.videos.urls.length < 1){
			$scope.videos.urls.push({'url':'', 'code':''});
		}

	});

	// when the account_info form is submmitted
	$scope.accountInfoSubmit = function() {

		console.log('accountInfoSubmit');

		// set url for geocoding request
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.user.city +','+'+'+ $scope.user.state +'&sensor=true_or_false&key=AIzaSyBbKDdBIm2VtMBr5Xdq1slh0IU39dm33tM';

		// call to google geocoding api to get lng and lat
		$http({method: 'GET', url: url}).success(function(data, status, headers, config) {

			// set user loc
      		$scope.user.loc = { 'type' : "Point", 'coordinates': [ data.results[0].geometry.location.lng, data.results[0].geometry.location.lng ] }

    		// update the user data
			$scope.user.put().then(function(){});

    	}).
    	error(function(data, status, headers, config) {
      	// called asynchronously if an error occurs
      	// or server returns response with an error status.
    	});

	};

	// when the audio form is submitted
	$scope.basicInfoSubmit = function() {

		console.log('basicInfoSubmit');

		$scope.user.genres = $scope.genres;
		$scope.user.instruments = $scope.instruments;
		console.log($scope.user.instruments);

		// update the user data
		$scope.user.put().then(function(){});

	};

	// when the audio form is submitted
	$scope.audioFormSubmit = function() {

		console.log('audioFormSubmit');

		// update the user data
		$scope.user.put().then(function(){});

	};

	// when the check box form is submitted
	$scope.checkboxFormSubmit = function() {

		console.log('checkboxFormSubmit');

		// update the user data
		$scope.user.put().then(function(){});

	};

	// when the video form is submitted
	$scope.videoFormSubmit = function() {

		for (var i=0;i<$scope.videos.urls.length;i++)
		{

			var url= $scope.videos.urls[i].url;
			var regExp = /(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/;
			var match = url.match(regExp);

			if (match&&match[2].length===11){

				$scope.videos.urls[i].code = match[2];
				console.log($scope.videos.urls[i]);

			}else{
			//error
			}
		}

		// update the video data
		$scope.videos.put().then(function(){
			console.log('meow');
		});
	};

	// when add input for videos is clicked
	$scope.addInput = function() {
		$scope.videos.urls.push({'url':'', 'code':''});
	};

	// when an item from the instruments array is clicked
	$scope.removeI = function(index){

		// removed it from the array
		$scope.instruments.splice(index, 1);
	};

	// when an item from the genres array is clicked
	$scope.removeG = function(index){

		// removed it from the array
		$scope.genres.splice(index, 1);
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

	$scope.selectedInstrument = null;


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

	$scope.selectedGenre = null;

	// Typeahead options object
	$scope.exampleOptions = {
		highlight: true
	};

});