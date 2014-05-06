'use strict';

/*global App*/

App.controller('MessageCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	// get db
     var m = Restangular.all('messages');

	// var postMessages = function(){
	// 	$scope.allMessages =
	// 				{
	// 			'userOneId' : '53630c5932c0536477c042a0',
	// 			'userTwoId' : '53505cd2c544c1d859281e2b',
	// 			'conversation' :
	// 			[
	// 				{
	// 					'userId' : '53630c5932c0536477c042a0' ,
	// 					'timeSent' : 'date',
	// 					'text' : 'This is a message.'
	// 				},
	// 				{
	// 					'userId' : '53505cd2c544c1d859281e2b' ,
	// 					'timeSent' : 'date',
	// 					'text' : 'This is a response to that message.'
	// 				}
	// 			]
	// 		};
	// 		// 		{
	// 		// 	'userOneId' : '53630c5932c0536477c042a0',
	// 		// 	'userTwoId' : '5363beae32c0536477c042a1',
	// 		// 	'conversation' :
	// 		// 	[
	// 		// 		{
	// 		// 			'userId' : '53630c5932c0536477c042a0' ,
	// 		// 			'timeSent' : 'date',
	// 		// 			'text' : 'Testing 123, This is a message.'
	// 		// 		},
	// 		// 		{
	// 		// 			'userId' : '5363beae32c0536477c042a1' ,
	// 		// 			'timeSent' : 'date',
	// 		// 			'text' : 'Testing 123, This is a response to that message.'
	// 		// 		}
	// 		// 	]
	// 		// }


	// 	// ];

	// 	m.post($scope.allMessages).then(function(item){
 //      });

	// };

	// postMessages();

});