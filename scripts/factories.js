var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.factory('LastFm', function($http, DataService){
		var apiKey = "22648f0dcab32971882df69c27c6d8c9";
		var apiRoot = "http://ws.audioscrobbler.com/2.0/";
		
		function get(method, onSuccess) {
			var promise = $http({ method: 'GET', url: buildUrl( method ) }).
				then(function(results) {
						return onSuccess(results);
					},
					function(data, status, headers, config) {
		    			debugger;
		  			}
		  		);
	  		return promise;
		}

		function buildUrl(method){
			return apiRoot + "?format=json&method=" + method + "&user=" + DataService.User.userName + "&api_key=" + apiKey; 
		}

		return {
			getArtistsForUser: function(userName) {
				return get("user.gettopartists", function(results) {
   					return results.data.topartists.artist;
  				});
			},
			getUserTracksForArtist: function(artist) {
				return "getUserTracksForArtist";
			}
		}
	});
		
}());
