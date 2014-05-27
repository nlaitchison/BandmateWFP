// if($scope.user.city && $scope.user.state){

// 			// set url for geocoding request
			// var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.user.city +','+'+'+ $scope.user.state +'&sensor=true_or_false&key=AIzaSyBbKDdBIm2VtMBr5Xdq1slh0IU39dm33tM';

// 			// call to google geocoding api to get lng and lat
// 			$http({method: 'GET', url: url}).success(function(data, status, headers, config) {

// 				// set user loc
// 	      		$scope.user.loc = { 'type' : 'Point', 'coordinates': [ data.results[0].geometry.location.lng, data.results[0].geometry.location.lat ] };

// 	    		// update the user data
// 				$scope.user.put().then(function(){});

// 	    	}).
// 	    	error(function(data, status, headers, config) {
// 	      	// called asynchronously if an error occurs
// 	      	// or server returns response with an error status.
// 	    	});
// 		}else{
// 			// update the user data
// 			$scope.user.put().then(function(){});
// 		}
var request = require('superagent');
exports.getGeo = function (city, state, cb) {
	var URI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city +',+' + state + '&sensor=true_or_false&key=AIzaSyBbKDdBIm2VtMBr5Xdq1slh0IU39dm33tM';
	// var options = {
	// 	host: "maps.googleapis.com",
	// 	path: '/maps/api/geocode/json?address=' + city +',+' + state + '&sensor=true_or_false&key=AIzaSyBbKDdBIm2VtMBr5Xdq1slh0IU39dm33tM'
	// }
	request.get(URI)
	.end(function(err, res) {
		var d = res.body.results[0].geometry.location;
		var lat = d.lat;
		var lng = d.lng;
		console.log(lat,lng);
		return cb(null, lat, lng);
	});
}

// http.get(options, function(res) {
//   console.log("Got response: " + res.statusCode);
// }).on('error', function(e) {
//   console.log("Got error: " + e.message);
// });