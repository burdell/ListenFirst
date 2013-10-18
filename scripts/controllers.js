var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			user: DataService.User,
			visibility: function(){
				return DataService.Artists.currentTopArtists.length == 0;
			}
		}

		$scope.setArtistsForUser = function(userName) {
			DataService.User.userName = userName;
			DataService.Artists.currentTopArtists = LastFm.getArtistsForUser();
		}
	}]);

	app.controller('ArtistsController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			artists: DataService.Artists,
			user: DataService.User
		}
		$scope.getFirstListen = function(artistName) {
			DataService.Tracks.firstTrack = LastFm.getFirstTrackForArtist(artistName);
		}

		$scope.clearArtists = function(){
			DataService.Artists.currentTopArtists = [];
			DataService.Tracks.firstTrack = null;
		}
	}]);

	app.controller('TracksController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){		
		$scope.data = {
			tracks: DataService.Tracks,
		}
	}]);
	
}());
