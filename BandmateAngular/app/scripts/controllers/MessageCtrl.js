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

    $scope.order = 'time';

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

    // check for new messages
    $sails.on('message', function(data) {

        console.log('New message received :: ', data);

        // if the message is in the current conversation
        if(data.data.conversationId === $scope.currentConversation.id){
            // call function to update scope
            getUserInfo(data.data);
        }

    });

    // get all conversations where current user is a participant
	$sails.get('/conversations', {participants : userId})
    	.success(function(c) {

            // set scope
            $scope.conversations = c;

            // get the user info for other participant
            for (var i=0;i<c.length;i++) {

                var convo = c[i];
                // get user info
                getConvoUserInfo(convo, i);
                getConvoMsg(convo, i);

            }

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

    // function to get user info for the convo
    var getConvoUserInfo = function(convo, pos){

        var getUser = '';
        if(convo.participants[0] === userId){
            getUser = convo.participants[1];
        }else{
            getUser = convo.participants[0];
        }

        // get the user info for the other participant
        $sails.get('/users', {id : getUser})
        .success(function(u) {

            // set key values
            $scope.conversations[pos].name = u.name;
            $scope.conversations[pos].profileImg = u.profileImg;

        });

        // get last message in convo
        $sails.get('/messages', {conversationId : convo.id})
            .success(function(m) {


            });

    };

    // function to get last msg for the convo
    var getConvoMsg = function(convo, pos){

        // get messages in the convo
        $sails.get('/messages', {conversationId : convo.id})
            .success(function(m) {

                // get the msgs in the right order
                var time = 'time';
                var reverse = true;
                var msgs = $filter('orderBy')(m, time, reverse);

                $scope.conversations[pos].lastMsg = msgs[0].text;
                $scope.conversations[pos].time = msgs[0].time;

            });

    };

    // function to get user info for each msg
    var getUserInfo = function(msg){

        // get the user info for each message
        $sails.get('/users', {id : msg.senderId})
        .success(function(u) {

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

        $scope.newMsg.text = '';

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

 //    $scope.clickMsg = function(id){


 //    };

 //    $scope.sendMsg = function(){

 //    };

 //    var newMsg = function(id){


 //    };

 //    $scope.deleteMsg = function(id){


 //    };


});