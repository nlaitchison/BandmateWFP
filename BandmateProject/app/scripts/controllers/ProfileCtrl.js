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
		'about' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius est in enim lobortis vestibulum. Aliquam congue pretium scelerisque. Nullam at faucibus orci. Etiam nec laoreet nisl. Proin nibh nibh, elementum sit amet metus id, ornare rhoncus tortor. Quisque pulvinar, est a dapibus rhoncus, lectus sapien vestibulum nunc, ut lobortis est turpis at odio. Sed accumsan hendrerit dolor, sit amet vulputate enim ultricies ac. Nunc nec varius elit, quis scelerisque lorem.'
	};

	$scope.user.age = getAge($scope.user.birthday);

	function getAge(dateString) {
	  var today = new Date();
	  var birthDate = new Date(dateString);
	  var age = today.getFullYear() - birthDate.getFullYear();
	  var m = today.getMonth() - birthDate.getMonth();
	  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	    age--;
	  }
	  return age;
	};

});