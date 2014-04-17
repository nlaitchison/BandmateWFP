'use strict';

/*global App*/

App.controller('UserCreateCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location) {
  $scope.submit = function() {
    var u = Restangular.all('users');

    // $scope.signup.email = '';

    if($scope.signup.password === $scope.validate.password){
      console.log('match');
      $scope.signup.email = $scope.signup.username;
      console.log($scope.signup.email);
      u.post($scope.signup).then(function(user){
        console.log(user);

        var encoded = Base64.encode($scope.signup.username + ':' + $scope.signup.password);

        $http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
          success(function(data, status, headers, config){
            if (data.message === 'login successful'){
              AuthService.setLoggedIn($scope.signup.username, encoded, data.user);
              console.log('nav ctrl:', AuthService.isLoggedIn());
              $location.path('/account/' + data.user.id);
              $scope.loggedIn = AuthService.isLoggedIn();
            }else{
              alert('Invalid Username or Password!');
            }
          });

      });
    }else{
      console.log('dont match');
    }

    // console.log($scope.signup.email);
  };
});