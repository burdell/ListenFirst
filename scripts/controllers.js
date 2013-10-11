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

	app.controller('ArtistsController', ['$scope', 'DataService', function($scope, DataService){
		$scope.data = {
			artists: DataService.Artists,
		}
	}]);

}());
