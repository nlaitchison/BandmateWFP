'use strict';

/*global App*/

App.controller('LogoutCtrl', function (AuthService, $location) {
  AuthService.setloggedOut();
  console.log(AuthService.isLoggedIn());

  $location.path('/');

  // You can redirect or whatever you want in here.
});