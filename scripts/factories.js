var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.factory('LastFm', function($http, DataService){
		var apiKey = "22648f0dcab32971882df69c27c6d8c9";
		var apiRoot = "http://ws.audioscrobbler.com/2.0/";
		
		function buildUrl(method, paramList){
			var url = apiRoot + "?format=json&limit=10&method=" + method 
				+ "&user=" + DataService.User.userName + "&api_key=" + apiKey;
			if (paramList){
				_.each(paramList, function(value, key){
					url += "&" + key + "=" + value;
				})
			}
			return url;
		}

		return {
			getArtistsForUser: function(userName) {
				var url = buildUrl("user.gettopartists");
				return $http.get(url)
					.then(function(result) {
						return result.data.topartists.artist;
					});
			},
			getUserTracksForArtist: function(artist) {
				var method = "user.getartisttracks";
				var url = buildUrl(method, { artist: artist });
				return $http.get(url)
					.then(function(result){
						var totalPages = Number(result.data.artisttracks['@attr'].totalPages);
						if (totalPages === 1) {
							return result;
						} else {
							var moreTracks = buildUrl(method, { artist: artist, page: totalPages });
							return $http.get(moreTracks);
						}
					})
					.then(function(result){						
						return result.data.artisttracks.track;
					});
			}
			getFirstTrackForArtist: function(artist) {
				return this.getUserTracksForArtist(artist).then(function(trackList){
					return _.last(trackList);
				});
			}
		}
	});
		
}());
