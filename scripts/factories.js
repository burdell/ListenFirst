var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.factory('LastFm', function($http){
		var apiKey = "22648f0dcab32971882df69c27c6d8c9";
		var apiRoot = "http://ws.audioscrobbler.com/2.0/";

		function get(method, userName, returnObj) {
			$http({ method: 'GET', url: buildUrl(method, userName) }).
				success(function(data, status, headers, config) {
   					returnObj.data = data;
  				}).
	  			error(function(data, status, headers, config) {
	    			debugger;
	  			});
		}

		function buildUrl(method, userName){
			return apiRoot + "?format=json&method=" + method + "&user=" + userName + "&api_key=" + apiKey; 
		}

		return {
			getArtistsForUser: function(userName) {
				var returnObj = {};
				get("user.gettopartists", userName, returnObj);
				return returnObj;
			},
			getUserTracksForArtist: function(artist) {
				return "getUserTracksForArtist";
			}
		}
	});
		
}());
