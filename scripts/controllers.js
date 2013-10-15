var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		var user = DataService.User;
		var artists = DataService.Artists;
		$scope.setArtistsForUser = function(userName) {
			user.userName = userName;
			artists.currentTopArtists = LastFm.getArtistsForUser();
		}
	}]);

	app.controller('ArtistsController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			artists: DataService.Artists,
		}
		$scope.getFirstListen = function(artistName) {
			DataService.Tracks.firstTrack = LastFm.getFirstTrackForArtist(artistName);
		}
	}]);

	app.controller('TracksController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			tracks: DataService.Tracks,
		}
	}]);
}());
