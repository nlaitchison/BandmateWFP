'use strict';

/*global App*/

App.controller('LoginCtrl', function ($scope, Restangular, $http, AuthService, Base64, $location) {

  $scope.submit = function() {

    var encoded = Base64.encode($scope.login.username + ':' + $scope.login.password);
    console.log(encoded);

    $http({method: 'POST', url: 'http://localhost:1337/auth/login', headers: {'Authorization': 'Basic ' + encoded}}).
    success(function(data, status, headers, config){
      console.log(data);
      if (data.message === 'login successful'){
        AuthService.setLoggedIn($scope.login.username, encoded);
        console.log('login ctrl:', AuthService.isLoggedIn());
        $location.path('/');

      }else{
        // alert('Invalid Username or Password!');
        $scope.loginErr = 'Invalid Username or Password!';
      }
    });


  };


});