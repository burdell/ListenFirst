var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;


app.factory('LastFm', [ '$http', 'DataService', 'ErrorService', function($http, DataService, ErrorService){
	var apiKey = "22648f0dcab32971882df69c27c6d8c9";
	var apiRoot = "http://ws.audioscrobbler.com/2.0/";
	
	function buildUrl(method, paramList){
		var url = apiRoot + "?format=json&limit=50&method=" + method 
			+ "&user=" + DataService.User.userName + "&api_key=" + apiKey;
		if (paramList){
			_.each(paramList, function(value, key){
				url += "&" + key + "=" + value;
			})
		}
		return url;
	}
	return {
		getArtistsForUser: function(userName, numArtists) {
			var options = {
				period: DataService.Filter.period,
				limit: DataService.Filter.limit
			};

			DataService.User.loading = true;
			var url = buildUrl("user.gettopartists", options);
			return $http.get(url)
				.then(function(result) {
					DataService.User.loading = false;
					var valid = ErrorService.User.validate(result);
					if (valid) {
						DataService.Artists.currentTopArtists = result.data.topartists.artist
						DataService.User.lastSetUserName = DataService.User.userName;
						DataService.User.settingUserName = false;
					}
				});
		},
		getUserTracksForArtist: function(artist) {
			DataService.Tracks.loading = true;
			var method = "user.getartisttracks";
			var url = buildUrl(method, { artist: artist });
			return $http.get(url)
				.then(function(result){
					var artistValid = ErrorService.Artist.validate(result);
					var tracksValid = artistValid && ErrorService.Track.validate(result);
					if (tracksValid) {
						var totalPages = Number(result.data.artisttracks['@attr'].totalPages);
						if (totalPages === 1) {
							return result;
						} else {
							var moreTracks = buildUrl(method, { artist: artist, page: totalPages });
							return $http.get(moreTracks);
						}
					}
					return tracksValid;
				})
				.then(function(result){
					DataService.Tracks.loading = false;
					if (result !== false) {
						var firstTracks = result.data.artisttracks.track;
						//wtf last.fm ... if page only has 1, you just return the track object instead of array?
						if (!_.isArray(firstTracks)) {
							firstTracks = [ firstTracks ];
						}
						DataService.Tracks.firstTrack =  firstTracks.pop();
					}
				});
		},
		getFirstTrackForArtist: function(artist) {
			return this.getUserTracksForArtist(artist).then(function(trackList){
				return _.last(trackList);
			});
		}
	}
}]);
	
