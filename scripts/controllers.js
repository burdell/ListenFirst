var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.user = DataService.User;
	
	$scope.selectUserVisibility = function(){
		return DataService.Artists.currentTopArtists.length == 0;
	}
	$scope.setArtistsForUser = function(userName) {
		DataService.Artists.currentTopArtists = LastFm.getArtistsForUser();
	}
	$scope.resetUser = function() {
		DataService.resetUser();
	}
}]);

app.controller('FilterController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.filter = DataService.Filter;
	$scope.filterVisibility = function(){
		return DataService.Artists.currentTopArtists.length != 0;
	}
	$scope.$watch('filter', function(){
		if (DataService.User.userName) {
			DataService.Artists.currentTopArtists = LastFm.getArtistsForUser();
		}
	}, true);
	
}]);

app.controller('ArtistsController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.artists = DataService.Artists;
	$scope.userName = DataService.User.userName;	
	
	$scope.getFirstListen = function(artistName) {
		DataService.Tracks.firstTrack = LastFm.getFirstTrackForArtist(artistName);
	}
}]);

app.controller('TracksController', ['$scope', 'DataService', function($scope, DataService){		
	$scope.data = {
		tracks: DataService.Tracks,
		user: DataService.User
	}
}]);

