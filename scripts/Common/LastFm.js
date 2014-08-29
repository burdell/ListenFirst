angular.module(ListenFirst.appName)
	.factory('LastFm', [ '$http', 'DataService', 'ErrorService', function($http, DataService, ErrorService){
		var apiRoot = "http://ws.audioscrobbler.com/2.0/";
		var defaultParams = {
			api_key: "22648f0dcab32971882df69c27c6d8c9",
			format: "json"
		}

		function getParams(paramList){
			return _.extend(paramList, defaultParams);
		}

		function setArtistData(artistName) {
			DataService.Tracks.artistName = artistName;
			var artist = _.findWhere(DataService.Artists.currentTopArtists, function(artist){
								return artist.name == artistName;
						});
			if (artist) {
				DataService.Tracks.artistImageUrl = artist.image[3]['#text'];
				DataService.Tracks.artistPlayCount = artist.playcount;
			} else {
				var params = getParams({ method: "artist.info", artist: artistName, username: DataService.User.userName });
				$http({ method: "GET", url: apiRoot, params: params }).then(function(response) {
					DataService.Tracks.artistImageUrl = response.data.artist.image[3]['#text'];
					DataService.Tracks.artistPlayCount = response.data.artist.stats.userplaycount;
				});	
			}
		}

		return {
			getUserData: function(userName) {
				var user = DataService.User;
				user.dataLoading = true;
				return $http({ method: "GET", url: apiRoot, params: getParams({ method: "user.getinfo", user: userName }) })
					.then(function(result){
						user.dataLoading = false;
						var userData;
						if (result.data && (userData = result.data.user)) {
							user.totalTracks = userData.playcount;
							user.realName = userData.realname;
						}
					});
			}, 
			getArtistsForUser: function(userName) {
				if (!userName) {
					userName = DataService.User.userName;
				}
				DataService.User.loading = true;
				var params = getParams({
					period: DataService.Filter.period,
					limit: DataService.Filter.limit,
					method: "user.gettopartists",
					user: userName
				});
				return $http({ method: "GET", url: apiRoot, params: params})
					.then(function(result) {
						DataService.User.loading = false;
						var valid = ErrorService.User.validate(result);
						if (valid) {
							DataService.Artists.currentTopArtists = result.data.topartists.artist
							DataService.User.settingUserName = false;
						}
						return valid;
					});
			},
			getUserTracksForArtist: function(artist) {
				DataService.Tracks.loading = true;
				var params = getParams({
					method: "user.getartisttracks",
					artist: artist,
					user: DataService.User.userName
				});
				return $http({ method: "GET", url: apiRoot, params: params })
					.then(function(result){
						var valid = ErrorService.Artist.validate(result) && ErrorService.Track.validate(result);
						if (valid) {
							var trackData = result.data.artisttracks['@attr']
							setArtistData(trackData.artist);

							var tracks = result.data.artisttracks.track;
							var lastTrack = _.isArray(tracks) ? tracks[0] : tracks;
							DataService.Tracks.setTrack(lastTrack, "lastTrack")

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
						var valid = result !== false;
						if (valid) {
							var trackList = result.data.artisttracks.track;
							var firstTrack = trackList;
							if (_.isArray(firstTrack)) {
								firstTrack = trackList.pop();
							}
							DataService.Tracks.setTrack(firstTrack, "firstTrack");
						}
						return valid;
					});
			}
		}
}]);