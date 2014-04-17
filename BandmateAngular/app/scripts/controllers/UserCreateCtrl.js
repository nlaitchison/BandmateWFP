'use strict';

/*global App*/

App.controller('UserCreateCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location) {
  $scope.submit = function() {
    var u = Restangular.all('users');

    if($scope.signup.password === $scope.validate.password){
      console.log('match');
      u.post($scope.signup).then(function(user){
        console.log(user);

        var encoded = Base64.encode($scope.login.username + ':' + $scope.login.password);

        $http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
          success(function(data, status, headers, config){
            if (data.message === 'login successful'){
              AuthService.setLoggedIn($scope.login.username, encoded, data.user);
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