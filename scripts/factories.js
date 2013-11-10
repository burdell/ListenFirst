var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;


app.factory('LastFm', [ '$http', 'DataService', 'ErrorService', function($http, DataService, ErrorService){
	var apiRoot = "http://ws.audioscrobbler.com/2.0/";
	var defaultParams = {
		api_key: "22648f0dcab32971882df69c27c6d8c9",
		format: "json"
	}

	function getParams(paramList){
		paramList.user = DataService.User.userName;
		return _.extend(paramList, defaultParams);
	}

	function setArtistImageUrl(artistName) {
			var artist = _.findWhere(DataService.Artists.currentTopArtists, function(artist){
								return artist.name == artistName;
						});
			if (artist) {
				DataService.Tracks.artistImageUrl = artist.image[3]['#text'];
			} else {
				var params = getParams({ method: "artist.info", artist: artistName });
				$http({ method: "GET", url: apiRoot, params: params }).then(function(response) {
					DataService.Tracks.artistImageUrl = response.data.artist.image[3]['#text'];
				});	
			}
		}

	return {
		getArtistsForUser: function(userName, numArtists) {
			DataService.User.loading = true;
			var params = getParams({
				period: DataService.Filter.period,
				limit: DataService.Filter.limit,
				method: "user.gettopartists"
			});
			return $http({ method: "GET", url: apiRoot, params: params})
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
			var params = getParams({
				method: "user.getartisttracks",
				artist: artist
			});
			return $http({ method: "GET", url: apiRoot, params: params })
				.then(function(result){
					var valid = ErrorService.Artist.validate(result) && ErrorService.Track.validate(result);
					if (valid) {
						var trackData = result.data.artisttracks['@attr']
						setArtistImageUrl(trackData.artist);
						var totalPages = Number(trackData.totalPages);
						if (totalPages === 1) {
							return result;
						} else {
							params.page = totalPages;
							return $http({ method: "GET", url: apiRoot, params: params});
						}
					}
					return valid;
				})
				.then(function(result){
					DataService.Tracks.loading = false;
					if (result !== false) {
						var firstTracks = result.data.artisttracks.track;
						//wtf last.fm ... if page only has 1, you just return the track object instead of array?
						if (!_.isArray(firstTracks)) {
							firstTracks = [ firstTracks ];
						}
						DataService.Tracks.firstTrack = firstTracks.pop();
					}
				});
		}
	}
}]);
	
