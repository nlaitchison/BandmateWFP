'use strict';

/*global App*/

App.controller('UserCreateCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location) {
  $scope.submit = function() {

    // get users db
    var u = Restangular.all('users');

    // if the passwords in the signup match
    if($scope.signup.password === $scope.validate.password){

      console.log('match');

      //set email to also equal the username field
      $scope.signup.email = $scope.signup.username;

      //set default profile img
      $scope.signup.profileImg = 'images/default-user-lrg.png';

      //set default accountType
      $scope.signup.accountType = {
        'musician' : 'false',
        'band' : 'false',
        'instructor' : 'false'
      };

      //set default genres
      $scope.signup.genres = [];

      //set default instruments
      $scope.signup.instruments = [];

      //set default email User
      $scope.signup.emailUser = 'true';

      //set default hide profile
      $scope.signup.hideUser = 'false';

      // add the user to the database then login the new user
      u.post($scope.signup).then(function(user){

        console.log(user);

        // encode for login
        var encoded = Base64.encode($scope.signup.username + ':' + $scope.signup.password);

        // login the user
        $http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
          success(function(data, status, headers, config){

            // if the user logged in
            if (data.message === 'login successful'){

              // set all the data for the user
              AuthService.setLoggedIn($scope.signup.username, encoded, data.user);

              console.log('nav ctrl:', AuthService.isLoggedIn());

              // create studio and video object for user
              createObjects(data.user.id);

              // take user to account page
              $location.path('/account/' + data.user.id);

              // set scope var for nav show and hide ul
              $scope.loggedIn = AuthService.isLoggedIn();

            }else{
              alert('Invalid Username or Password!');
            }
          });

      });
    }else{

      // if they don't match, do nothing yet.
      console.log('dont match');
    }
  };

  var createObjects = function(id){

    // get users db
    var s = Restangular.all('studios');

    $scope.studio = {
      'id' : id,
      'following' : []
    };

    s.post($scope.studio).then(function(studio){
      console.log(studio);
    });

    // get users db
    var v = Restangular.all('videos');

    $scope.videos = {
      'id' : id,
      'urls' : []
    };

    v.post($scope.videos).then(function(videos){
      console.log(videos);
    });
  };

});