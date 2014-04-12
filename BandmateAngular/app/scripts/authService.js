'use strict';

/*global App*/

// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

  // Protects views where angular is not loaded from errors
  if ( typeof angular === 'undefined' ) {
    return;
  }

  App.service('AuthService', function(Base64, $cookieStore, Restangular, $http) {

    var cookie;
    var loggedIn = false;

    this.setHeader = function(){
      cookie = 'Basic' + $cookieStore.get('authData');
      $http.defaults.headers.common['Authorization'] = cookie;

      loggedIn = true;
    };

    this.checkCookie = function(){
      if($cookieStore.get('authData') !== 'undefined'){
        this.setHeader();
      }
    };

    this.setLoggedIn = function(username, encoded){
      $http.defaults.headers.common['Authorization'] = 'Basic ' + encoded;
      $cookieStore.put('authData', encoded);
      this.setHeader();
    };

    this.setloggedOut = function(){
      $http.defaults.headers.common['Authorization'] = '';
      $cookieStore.remove('authData');
      loggedIn =false;
    };

    this.isLoggedIn = function(){
      return loggedIn;
    };

    // this.setHeader();
  });


})();
