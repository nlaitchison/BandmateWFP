User collection

var user = {
	'id' : ,
	'email' :,
	'password' : , //hashed and whatnot
	'showInResult' : , //boolean
	'emailMessages' : , //boolean
	'profileImg' : '',
	'name' : '',
	'accountType' : [''],
	'city' : '',
	'state' : '',
	'birthday' : '',
	'gender' : '',
	'lastActive' : '',
	'facebookUrl' : '',
	'twitterUrl' : '',
	'soundcloudUrl' : '',
	'youtubeUrl' : '',
	'about' : '',
	'lookingFor' : '',
	'instruments' : [''],
	'genres' : [''],
	'equipment' : '',
	'yearsOfExp' : '',
	'gigsPlayed' : '',
	'commitment' : '',
	'availability' : '',
	'scUrl' : '',
};


Videos collection

var video = {
    'url': 'someUrl',
    'userId': 'usersId'
}


Studio collection

var studio = {
	'userId' : ,
	'following' : [] //userIds in studio
}


Updates collection

var update = {
	'userId': ,
	'updateType' : '', // ex. instruments, profileImg
	'updateInfo' : '', // ex. video url, instruments array
	'timestamp' : ,
}


Messages collection

var message = {
	'id': ,
	'userOneId': ,
	'userTwoId': ,
	'conversation' :
	[
		{
			'userId' : ,
			'userName': '',
			'userImg': '',
			'timeSent' : ,''
			'text' : '',
		}
	]
}

Filter Collection //users have a saved default filter for refining search results

var filter = {
	'userId' : ;
	'age' : ;
	'location' : '',
	'radius' : '',
	'genre' : [],
	'yearsOfExp' : '',
	'gigsPlayed' : '',
	'commitment' : '',
	'availability' : '',
}
