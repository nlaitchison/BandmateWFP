'use strict';

/*global App*/

App.controller('MessageCtrl', function ($scope, Restangular, $location, AuthService, $cookieStore, $filter, $sails, $routeParams) {

	//make sure logginVar is set
	$scope.loggedIn = AuthService.isLoggedIn();

	// get current user's id
	var userId = $cookieStore.get('userId');

    // set scope for conversations
    $scope.conversations = [];
    $scope.currentConversation = '';

    // set for order filter in view
    $scope.order = 'time';

    // check for new messages
    $sails.on('message', function(data) {

        // console.log('New message received :: ', data);

        switch(data.model){

            case 'messages':
                if(data.data.conversationId === $scope.currentConversation.id){
                    // call function to update scope
                    getUserInfo(data.data.senderId, function(u){
                        data.data.name = u.name;
                        data.data.profileImg = u.profileImg;
                    });
                    $scope.currentConversation.messages.push(data.data);
                }

                    // if the user isn't viewing the conversation that has a new message
                    // set the newMsg var to true
                    $sails.put('/conversations/' + data.data.conversationId, {newMsg : true}, function (response) {
                        console.log('updated', true);
                    });

                break;

            case 'conversations':
                // reload conversations in the inbox
                // loadConversations(function(){});
                if (data.verb === 'create') {
                    $scope.conversations.push(data.data);
                    getConvoUserInfo(data.data, $scope.conversations.length -1);
                    getConvoMsg(data.data, $scope.conversations.length -1);
                } else if (data.verb === 'update') {
                    var convo = $scope.conversations.indexOf(_.findWhere($scope.conversations, {id: data.data.id}));
                    $scope.conversations[convo].newMsg = data.data.newMsg;
                    console.log(convo);
                }
                break;
        }

    });

    // get all conversations where current user is a participant
    var loadConversations = function(cb) {
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
            cb();

        });
    }

    var getParticipants = function(id) {
        return $sails.get('/conversations', {id: id})
            .success(function(c) {
                return c.participants
            });
    }

    var getOtherUser = function(convoId) {
        return getParticipants(convoId).then(function(ids){
            console.log('id', ids.participants);
            return _.without(ids.participants, userId);
        });
    };

    // load all the messages for a conversation
    $scope.loadMsgs = function(id){

        console.log('loadMsgs');
        $sails.put('/conversations/' + id, {newMsg : false}, function (response) {
            console.log('updated', true);
        });

        // get all the messages for that conversation
        $sails.get('/messages', {conversationId : id})
            .success(function(m) {

                // set the scope for the current conversation
                $scope.currentConversation = {
                    rName : '',
                    id: id,
                    messages: []
                };
                // console.log(m);

                // loop through all the messages
                var msgs = _.map(m, function(o){
                    getUserInfo(o.senderId, function(u){
                        o.name = u.name;
                        o.profileImg = u.profileImg;
                    })
                    return o;
                });

                $scope.currentConversation.messages = msgs;


            });

            getOtherUser(id).then(function(user){
                getUserInfo(user[0], function(r){
                    $scope.currentConversation.rName = r.name;
                })
                //$scope.currentConversation.rName = user.name;
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

    // clicked msg button on user profile
    $scope.clickMsg = function(id){

        console.log('clicked');

        $sails.get('/conversations', {participants : userId} && {participants : id})
            .success(function(c) {
                // console.log(c.id);
                if(c.length != 0){
                    $location.path('/messages/');
                }else{
                    $location.path('/messages');
                }

                console.log(c);
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

                // set the last msg info for the convo
            if(!_.isEmpty(msgs))    {
                $scope.conversations[pos].lastMsg = msgs[0].text;
                $scope.conversations[pos].time = msgs[0].time;
            }

            });

    };

    // function to get user info for each msg
    var getUserInfo = function(id, cb){

        // get the user info for each message
        $sails.get('/users', {id : id})
        .success(function(u) {

            // // set key values
            // msg.name = u.name;
            // msg.profileImg = u.profileImg;

            // // push all message to the current conversation object
            // $scope.currentConversation.messages.push(msg);
            // console.log(u);
            return cb(u);

        });

    };

    // check to see if a conversation exists with a user
    var findConvoByUser = function(searchingUser) {

        var convo = _.find($scope.conversations, function(o){
            return _.contains(o.participants, searchingUser);
        });
        if (convo) {
            return convo.id;
        }

        return null;

    };

    // loads the controller
    var init = function() {

        loadConversations(function(){
            var searchObj = $location.search();

            if (searchObj.user) {
                var convoId = findConvoByUser(searchObj.user);
                // var otherUser =
                if (convoId) {
                    $scope.loadMsgs(convoId);
                } else {
                    var c = {
                        participants: [userId, searchObj.user]
                    }

                    $sails.post('/conversations/', c, function (response) {
                        console.log(response);
                        $scope.loadMsgs(response.id);
                    });
                }

            } else if(!_.isEmpty($scope.conversations)){
                $scope.loadMsgs($scope.conversations[0].id);
            }
        });

    };


    if(!$scope.loggedIn){
        $location.path('/');
    }else{
        init();
    }


});