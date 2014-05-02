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

    this.setLoggedIn = function(username, encoded, user){
      $http.defaults.headers.common['Authorization'] = 'Basic ' + encoded;
      $cookieStore.put('authData', encoded);
      $cookieStore.put('userId', user.id);
      this.setHeader();
    };

    this.setloggedOut = function(){
      $http.defaults.headers.common['Authorization'] = '';
      $cookieStore.put('authData', '');
      $cookieStore.put('userId', '');
      loggedIn = false;
    };

    this.isLoggedIn = function(){
      var user = $cookieStore.get('authData');

      // console.log('auth loggedIn', loggedIn);

      if(user !== ''){
        loggedIn = true;
      }else{
        loggedIn = false;
      }
      return loggedIn;
    };
    // this.setHeader();
  });


})();
