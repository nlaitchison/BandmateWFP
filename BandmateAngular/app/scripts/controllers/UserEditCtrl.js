'use strict';

/*global App*/

App.controller('UserEditCtrl', function ($scope, Restangular, $routeParams, $location, AuthService) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get user from db
	Restangular.one('users', $routeParams.id).get().then(function(u){

		//set scope to db
		$scope.user = u;

	});

	// when the account_info form is submmitted
	$scope.accountInfoSubmit = function() {

		console.log('accountInfoSubmit');

		// update the user data
		$scope.user.put().then(function(){
		});

    };

    // when the audio form is submitted
    $scope.basicInfoSubmit = function() {

    	console.log('basicInfoSubmit');

		// update the user data
		$scope.user.put().then(function(){
		});

    };

    // when the audio form is submitted
    $scope.audioFormSubmit = function() {

    	console.log('audioFormSubmit');

		// update the user data
		$scope.user.put().then(function(){
		});

    };

    // when the check box form is submitted
    $scope.checkboxFormSubmit = function() {

    	console.log('checkboxFormSubmit');

		// update the user data
		$scope.user.put().then(function(){
		});

    };


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

});