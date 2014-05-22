'use strict';

/*global App*/

App.controller('UserViewCtrl', function ($scope, Restangular, $routeParams, $location, AuthService, user, videos) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	//set scope to db
	$scope.user = user;
	$scope.videos = videos;

	// use soundcloud api to insert soundcloud iframe
	$.get(
		'http://api.soundcloud.com/resolve.json?url=' + $scope.user.scPlayerUrl + '&client_id=dfc5f1fa84c13d3d8888d1fb9c094f89',
		function (result) {

			$('.user_audio').html('<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' +  result.uri + '&amp;color=2a258e&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');

			console.log(result.uri);
		}
	);

	function getAccountType() {
		$scope.user.account = [];
		if($scope.user.accountType.musician === "true"){
			$scope.user.account.push('Musician');
		}
		if($scope.user.accountType.band === "true"){
			$scope.user.account.push('Band');
		}
		if($scope.user.accountType.instructor === "true"){
			$scope.user.account.push('Instructor');
		}
	};

	getAccountType();

	// for(var i=0; i < $scope.user.ytUrl.length; i++){
	// 	console.log($scope.user.ytUrl[i]);
	// }

	// var videoId = window.location.search.split('v=')[1];
	// var ampersandPosition = videoId.indexOf('&');
	// if(ampersandPosition !== -1) {
	// 	videoId = videoId.substring(0, ampersandPosition);
	// }

	// $scope.user = {
	// 	'id' : 1,
	// 	'profileImg' : 'images/user-img-lrg.png',
	// 	'name' : 'Rou Reynolds',
	// 	'accountType' : ['Musician', 'Instructor'],
	// 	'city' : 'Orlando',
	// 	'state' : 'FL',
	// 	'birthday' : '1994-03-01',
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
	// 	'yearsOfExp' : '5',
	// 	'gigsPlayed' : '20 - 30',
	// 	'commitment' : 'Very Commited',
	// 	'availability' : '4 days per week',
	// 	'scPlayerUrl' : 'https://soundcloud.com/entershikari/sets/sssnakepit-remixes',
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

});