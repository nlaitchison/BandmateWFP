
 	//       $scope.videos = {
	//    	'id' : '53505cd2c544c1d859281e2b',
 	//    	'urls' : [
 	//    		{
	// 			'url' : 'http://www.youtube.com/embed/Oww-7cxOBUk',
	// 			'code' : 'Oww-7cxOBUk',
	// 		},
	// 		{
	// 			'url' : 'http://www.youtube.com/embed/PSjaM9E2gr4',
	// 			'code' : 'PSjaM9E2gr4',
	// 		},
	// 		{
	// 			'url' : 'http://www.youtube.com/embed/PSjaM9E2gr4',
	// 			'code' : 'PSjaM9E2gr4',
	// 		}
	//    	]
	// };

	// v.post($scope.videos).then(function(item){
	// 	console.log(item);
	// });

	// $scope.user = {
	// 	'id' : 1,
	// 	'email' : 'testing123@gmail.com',
	// 	'profileImg' : 'images/user-img-lrg.png',
	// 	'name' : 'Rou Reynolds',
	// 	'accountType' : ['Musician', 'Instructor'],
	// 	'city' : 'Orlando',
	// 	'state' : 'FL',
	// 	'birthMonth' : '03',
	// 	'birthDay' : '01',
	// 	'birthYear' : '1994',
	// 	'gender' : 'Male',
	// 	'lastActive' : 'Tue Apr 01 2014 18:26:05 GMT-0400 (EDT)',
	// 	'facebookUrl' : 'https://www.facebook.com/nlaitchison',
	// 	'twitterUrl' : 'https://twitter.com/nlaitchison',
	// 	'soundcloudUrl' : 'https://soundcloud.com/todieistoawaken',
	// 	'youtubeUrl' : 'https://www.youtube.com/channel/UC95R45xK1LH14JsKblg2R_g',
	// 	'about' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius est in enim lobortis vestibulum. Aliquam congue pretium scelerisque. Nullam at faucibus orci. Etiam nec laoreet nisl. Proin nibh nibh, elementum sit amet metus id, ornare rhoncus tortor. Quisque pulvinar, est a dapibus rhoncus, lectus sapien vestibulum nunc, ut lobortis est turpis at odio. Sed accumsan hendrerit dolor, sit amet vulputate enim ultricies ac. Nunc nec varius elit, quis scelerisque lorem.',
	// 	'lookingFor' : 'Band',
	// 	'instruments' : ['Vocals - Advanced', 'Keyboard - Advanced', 'Acoustic Guitar - Intermediate'],
	// 	'genres' : ['Post-Hardcore', 'Electronic'],
	// 	'equipment' : 'Fender CJ 290 SCE Acoustic Electric Guitar',
	// 	'yearsOfExp' : 5,
	// 	'gigsPlayed' : '20 - 30',
	// 	'commitment' : 'Very Commited',
	// 	'availability' : '4 days per week',
	// 	'scPlayerUrl' : 'https://soundcloud.com/entershikari/sets/sssnakepit-remixes',
	// 	'emailUser' : 'true',
	// 	'hideUser' : 'false'
	// };

	// $scope.videos = [
	// 	{
	// 		'url' : 'http://www.youtube.com/embed/Oww-7cxOBUk',
	// 		'code' : 'Oww-7cxOBUk',
	// 		'userId' : '1'
	// 	},
	// 	{
	// 		'url' : 'http://www.youtube.com/embed/PSjaM9E2gr4',
	// 		'code' : 'PSjaM9E2gr4',
	// 		'userId' : '1'
	// 	},
	// 	{
	// 		'url' : 'http://www.youtube.com/embed/PSjaM9E2gr4',
	// 		'code' : 'PSjaM9E2gr4',
	// 		'userId' : '1'
	// 	}
	// ];

			// users/search?lat=-11&lng=11
		// var searchModel={
		// 	lat: '-11',
		// 	lng: '11',
		// 	position: 'drummer',
		// 	name: 'kyle'
		// }

		// if the filter has a location set, then get their lng and lat
		// if($scope.filter.city && $scope.filter.state){
		// 	console.log('working');

		// 	// set url for geocoding request
		// 	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.filter.city +','+'+'+ $scope.filter.state +'&sensor=true_or_false&key=AIzaSyBbKDdBIm2VtMBr5Xdq1slh0IU39dm33tM';

		// 	// call to google geocoding api to get lng and lat
		// 	$http({method: 'GET', url: url}).success(function(data, status, headers, config) {

		// 		// set filter lat and lng
	 //      		$scope.filter.lat = data.results[0].geometry.location.lat;
	 //      		$scope.filter.lng = data.results[0].geometry.location.lng;

	 //      		$http({method: 'GET', url: 'http://localhost:1337/search/advance', params: $scope.filter}).
		// 			success(function(data, status, headers, config) {
		// 			  // this callback will be called asynchronously
		// 			  // when the response is available

		// 			  $scope.results = data;
		// 			  console.log('results near', $scope.results);

		// 			}).
		// 			error(function(data, status, headers, config) {
		// 			  // called asynchronously if an error occurs
		// 			  // or server returns response with an error status.
		// 			});


	 //    	}).error(function(data, status, headers, config) {
	 //      	// called asynchronously if an error occurs
	 //      	// or server returns response with an error status.
	 //    	});
		// }else{
		// 	// update the user data
		// 	// $scope.user.put().then(function(){});

			// if sc url exists
	// if($scope.user.scPlayerUrl !== undefined && $scope.user.scPlayerUrl !== ''){
	// 	// use soundcloud api to insert soundcloud iframe
	// 	$.get(
	// 		'http://api.soundcloud.com/resolve.json?url=' + $scope.user.scPlayerUrl + '&client_id=dfc5f1fa84c13d3d8888d1fb9c094f89',
	// 		function (result) {

	// 			$('.user_audio').html('<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' +  result.uri + '&amp;color=2a258e&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');

	// 			console.log(result.uri);
	// 		}
	// 	);
	// }
