'use strict';

app.controller('SailsSocketCtrl', function TodoCtrl($scope, $modal, sailsSocket) {

  //
  // Listen for Sails/Socket events
  //
  // NOTE:
  // The `sailsSocket` factory forwards several of socket.io's events
  // to angular's $rootScope. See the `eventForwards` option inside
  // of `angular-sails.io.js` for details.
  //
  $scope.socketReady = false; // Wait for socket to connect

  $scope.$on('sailsSocket:connect', function(ev, data) {
    $scope.socketReady = true;
  });

  $scope.$on('sailsSocket:disconnect', function(ev, data) {

    $scope.socketReady = false;
  });

  $scope.$on('sailsSocket:failure', function(ev, data) {

  });

});