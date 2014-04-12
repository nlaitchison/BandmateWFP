'use strict';

/*global App*/

App.controller('UserCreateController', function ($scope, Restangular) {
  $scope.submit = function() {
    var u = Restangular.all('users');

    if($scope.user.password === $scope.validate.password){
      console.log('match');
      u.post($scope.user).then(function(item){
        console.log(item);
      });
    }else{
      console.log('dont match');
    }
  };
});