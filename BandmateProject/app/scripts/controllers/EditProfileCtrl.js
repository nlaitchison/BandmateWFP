'use strict';

/*global App*/

App.controller('EditProfileCtrl', function ($scope) {

	$scope.user = {
		'id' : 1,
		'profileImg' : 'images/user-img-lrg.png',
		'name' : 'Rou Reynolds',
		'accountType' : ['Musician', 'Instructor'],
		'city' : 'Orlando',
		'state' : 'FL',
		'birthday' : '1994-03-01',
		'gender' : 'Male',
		'lastActive' : 'Tue Apr 01 2014 18:26:05 GMT-0400 (EDT)',
		'facebookUrl' : 'https://www.facebook.com/nlaitchison',
		'twitterUrl' : 'https://twitter.com/nlaitchison',
		'soundcloudUrl' : 'https://soundcloud.com/todieistoawaken',
		'youtubeUrl' : 'https://www.youtube.com/channel/UC95R45xK1LH14JsKblg2R_g',
		'about' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius est in enim lobortis vestibulum. Aliquam congue pretium scelerisque. Nullam at faucibus orci. Etiam nec laoreet nisl. Proin nibh nibh, elementum sit amet metus id, ornare rhoncus tortor. Quisque pulvinar, est a dapibus rhoncus, lectus sapien vestibulum nunc, ut lobortis est turpis at odio. Sed accumsan hendrerit dolor, sit amet vulputate enim ultricies ac. Nunc nec varius elit, quis scelerisque lorem.',
		'lookingFor' : 'Band',
		'instruments' : ['Vocals - Advanced', 'Keyboard - Advanced', 'Acoustic Guitar - Intermediate'],
		'genres' : ['Post-Hardcore', 'Electronic'],
		'equipment' : 'Fender CJ 290 SCE Acoustic Electric Guitar',
		'yearsOfExp' : '5',
		'gigsPlayed' : '25 +',
		'commitment' : 'Very Commited',
		'availability' : '4 days per week',
		'scPlayerUrl' : 'https://soundcloud.com/entershikari/sets/sssnakepit-remixes',
	};

	$scope.videos = [
		{
			'url' : 'http://www.youtube.com/embed/Oww-7cxOBUk',
			'code' : 'Oww-7cxOBUk',
			'userId' : '1'
		},
		{
			'url' : 'http://www.youtube.com/embed/PSjaM9E2gr4',
			'code' : 'PSjaM9E2gr4',
			'userId' : '1'
		},
		{
			'url' : 'http://www.youtube.com/embed/PSjaM9E2gr4',
			'code' : 'PSjaM9E2gr4',
			'userId' : '1'
		}
	];

});