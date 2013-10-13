var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.factory('LastFm', function($http, DataService){
		var apiKey = "22648f0dcab32971882df69c27c6d8c9";
		var apiRoot = "http://ws.audioscrobbler.com/2.0/";
		
		function get(method, onSuccess, paramList) {
			var promise = $http({ method: 'GET', url: buildUrl( method, paramList ) }).
				then(function(results) {
						return onSuccess(results);
					},
					function(data, status, headers, config) {
		    			debugger;
		  			}
		  		);
	  		return promise;
		}

		function buildUrl(method, paramList){
			var url = apiRoot + "?format=json&limit=10&&method=" + method 
				+ "&user=" + DataService.User.userName + "&api_key=" + apiKey;
			if (paramList){
				var i;
				_.each(paramList, function(value, key){
					url += "&" + key + "=" + value;
				})
			}
			return url;

		}

		return {
			getArtistsForUser: function(userName) {
				return get("user.gettopartists", function(results) {
   					return results.data.topartists.artist;
  				});
			},
			getUserTracksForArtist: function(artist) {
				return get("user.getartisttracks", function(results){
					return results.data.artisttracks.track;
				}, { artist: artist });
			}
		}
	});
		
}());
