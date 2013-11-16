var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.user = DataService.User;
	$scope.enteredUserName = null;

	$scope.setArtistsForUser = function(userName) {
		if (!$scope.enteredUserName) { 
			return;
		}
		LastFm.getArtistsForUser($scope.enteredUserName).then(function(validUser){
			if (validUser) {
				DataService.Tracks.resetTrack();
				DataService.User.userName = userName;
				$scope.enteredUserName = null;
			}
		});
	}

	$scope.resetUser = function() {
		DataService.resetUser();
	}
}]);

app.controller('FilterController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.filter = DataService.Filter;
	$scope.user = DataService.User;

	$scope.$watch('filter', function(){
		if (DataService.User.userName) {
			LastFm.getArtistsForUser();
		}
	}, true);
	
}]);

app.controller('ArtistsController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.artists = DataService.Artists;
	$scope.user = DataService.User;
	$scope.artistSearchTerm = null;

	$scope.getFirstListen = function(artistName) {
		LastFm.getUserTracksForArtist(artistName).then(function(validArtist){
			if (validArtist) {
				$scope.artistSearchTerm = null;
			}
		});
	}

	$scope.$watch('user.lastSetUserName', function(newVal, oldVal) {
		if (newVal != oldVal) {
			$scope.accordion.bodyShown = true;
		}
	});
}]);

app.controller('TracksController', ['$scope', 'DataService', function($scope, DataService){		
	$scope.tracks = DataService.Tracks;
	$scope.user = DataService.User;
}]);

