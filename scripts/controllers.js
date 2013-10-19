var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		$scope.data = {
			user: DataService.User,
			selectUserVisibility: function(){
				return DataService.Artists.currentTopArtists.length == 0;
			}
		}

		$scope.setArtistsForUser = function(userName) {
			DataService.Artists.currentTopArtists = LastFm.getArtistsForUser();
		}
		$scope.resetUser = function() {
			DataService.resetUser();
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

	app.controller('TracksController', ['$scope', 'DataService', function($scope, DataService){		
		$scope.data = {
			tracks: DataService.Tracks,
		}
	}]);
	
}());
