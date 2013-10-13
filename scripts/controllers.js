var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		var user = DataService.User;
		var artists = DataService.Artists;
		$scope.setArtistsForUser = function(userName) {
			user.userName = userName;
			LastFm.getArtistsForUser().then(function(artistList){
				artists.currentTopArtists = artistList;
			});
		}
	}]);

	app.controller('ArtistsController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			artists: DataService.Artists,
		}
		var user = DataService.User;
		$scope.getFirstListen = function(artistName) {
			LastFm.getUserTracksForArtist(artistName).then(function(trackList){
				var firstTrack = _.last(trackList);
				DataService.Tracks.firstTrack = firstTrack;
			});	
		}
	}]);

	app.controller('TracksController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			tracks: DataService.Tracks,
		}
	}]);
}());
