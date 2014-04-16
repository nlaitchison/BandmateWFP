'use strict';

/*global App*/

App.controller('UserCreateCtrl', function ($scope, Restangular) {
  $scope.submit = function() {
    var u = Restangular.all('users');

    if($scope.signup.password === $scope.validate.password){
      console.log('match');
      u.post($scope.signup).then(function(item){
        console.log(item);
      });
    }else{
      console.log('dont match');
    }

    // console.log($scope.signup.email);
  };
});