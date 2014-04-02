'use strict';

/*global App*/

App.controller('ProfileCtrl', function ($scope) {
	$scope.user = {
		'id' : 1,
		'profileImg' : 'images/user-img-lrg.png',
		'name' : 'Rou Reynolds',
		'accountType' : 'Musician / Instructor',
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
		'sc_url' : 'https://soundcloud.com/fat-wreck-chords/sets/playlist-set'
	};

	function getAge(dateString) {
	  var today = new Date();
	  var birthDate = new Date(dateString);
	  var age = today.getFullYear() - birthDate.getFullYear();
	  var m = today.getMonth() - birthDate.getMonth();
	  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	    age--;
	  }
	  return age;
	}

	$scope.user.age = getAge($scope.user.birthday);

	$.get(
	  'http://api.soundcloud.com/resolve.json?url=' + $scope.user.sc_url + '&client_id=dfc5f1fa84c13d3d8888d1fb9c094f89',
	  function (result) {

	  	$('.user_audio').html('<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' +  result.uri + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');

	    console.log(result.uri);
	  }
	);


	// SC.initialize({
	//   client_id: 'dfc5f1fa84c13d3d8888d1fb9c094f89'
	// });

	// var track_url = 'http://soundcloud.com/forss/flickermood';

	// SC.oEmbed(track_url, { auto_play: false }, function(oEmbed) {
	//   console.log('oEmbed response: ' + oEmbed);
	// });

});