'use strict';

/*global App*/

App.controller('MessageCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get cuurent user's id
	var userId = $cookieStore.get('userId');

	$scope.allMsg = [];

	Restangular.all('messages').getList().then(function(m){

    	console.log(m);

    	for (var i=0;i<m.length;i++)
		{
			if(m[i].userOneId === userId){
				console.log('one match');

				getUserOne(m[i]);

			}

			if(m[i].userTwoId === userId){
				console.log('two match');

				getUserTwo(m[i]);

			}
		}

    });

    var getUserOne = function(m){

    	// get their user data from the users db
		Restangular.one('users', m.userTwoId).get().then(function(u){

			var c = {
				'id' : m.id,
				'recipientId' : u.id,
				'recipientName' : u.name,
				'recipientImg' : u.profileImg,
				'updated' : m.updatedAt,
				'conversation' : m.conversation[m.conversation.length - 1]
			};

			$scope.allMsg.push(c);

		});

    };

    var getUserTwo = function(m){

    	// get their user data from the users db
		Restangular.one('users', m.userOneId).get().then(function(u){

			var c = {
				'id' : m.id,
				'recipientId' : u.id,
				'recipientName' : u.name,
				'recipientImg' : u.profileImg,
				'updated' : m.updatedAt,
				'conversation' : m.conversation[m.conversation.length - 1]
			};

			$scope.allMsg.push(c);

		});
    };

    $scope.loadMsg = function(id){
    	console.log(id);

    	Restangular.one('messages', id).get().then(function(m){

			$scope.currentMsg = m;

		});
    }



	// var postMessages = function(){
	// var m = Restangular.all('messages');
	// 		$scope.allMessages =
	// 				{
	// 			'userOneId' : '53505cd2c544c1d859281e2b',
	// 			'userTwoId' : '53630c5932c0536477c042a0',
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