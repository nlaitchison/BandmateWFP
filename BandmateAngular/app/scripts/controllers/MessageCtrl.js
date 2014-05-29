'use strict';

/*global App*/

App.controller('MessageCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore, $filter, $sails) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get current user's id
	var userId = $cookieStore.get('userId');

    // set scope for conversations
    $scope.conversations = [];
    $scope.currentConversation = '';

    // objects that make up messaging
    // messages match up to conversations

    // conversation = {
    //     id: uniqueId,
    //     participants: ['oneId', 'twoId']
    // }

    // message = {
    //     id: uniqueId,
    //     conversationId: conversationId,
    //     sender: userId,
    //     time: timestamp,
    //     text: 'message text'
    // }

    // get all conversations where current user is a participant
	$sails.get('/conversations', {participants : userId})
    	.success(function(c) {

            // set scope
            $scope.conversations = c;

    	});

    // load all the messages for a conversation
    $scope.loadMsgs = function(id){

        console.log('loadMsgs');

        // get all the messages for that conversation
        $sails.get('/messages', {conversationId : id})
            .success(function(m) {

                // set the scope for the current conversation
                $scope.currentConversation = {
                    id: id,
                    messages: []
                };

                // loop through all the messages
                for (var i=0;i<m.length;i++) {

                    var msg = m[i];
                    // get user info
                    getUserInfo(msg);

                }

            });

    };

    // function to get user info for each msg
    var getUserInfo = function(msg){

        // get the user info for each message
        $sails.get('/users', {id : msg.senderId})
        .success(function(u) {

            console.log(msg);

            // set key values
            msg.name = u.name;
            msg.profileImg = u.profileImg;

            // push all message to the current conversation object
            $scope.currentConversation.messages.push(msg);

        });

    };

    // send a messsage
    $scope.sendMsg = function(id){

        var m = {
            conversationId: id,
            senderId: userId,
            time: new Date(),
            text: $scope.newMsg.text
        };

        $sails.post('/messages/', m, function (response) {
            console.log('sent message', response);
        });

    };

    // post a conversation
    // var c = {
    //     participants: ['5384dec90b41607a2f3a3ca3', '53854207e38a20892f2d1cff']
    // }

    // $sails.post('/conversations/', c, function (response) {
    //     console.log(response);
    // });

    // post a message
    // var m = {
    //     conversationId: id,
    //     senderId: userId,
    //     time: new Date(),
    //     text: 'message text'
    // }

    // $sails.post('/messages/', m, function (response) {
    //     console.log(response);
    // });




    // check for new messages
	// $sails.on('message', function(data) {
	// 	console.log('New message received :: ', data.data.conversation);
	// });



 //    $scope.clickMsg = function(id){


 //    };

 //    $scope.sendMsg = function(){

 //    };

 //    var newMsg = function(id){


 //    };

 //    $scope.deleteMsg = function(id){


 //    };


});