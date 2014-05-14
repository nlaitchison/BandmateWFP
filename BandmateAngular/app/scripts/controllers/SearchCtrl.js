'use strict';

/*global App*/

App.controller('SearchCtrl', function ($scope, Restangular) {

	$scope.filterResults = function(){
		Restangular.all('users').getList().then(function(u){

	    	$scope.results = u;

	    });
	};


});