var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

app.controller('UserController', ['$scope', 'DataService', 'LastFm', 'ErrorService', function($scope, DataService, LastFm, ErrorService){
	$scope.user = DataService.User;

	$scope.setArtistsForUser = function(userName) {
		if (!DataService.User.userName) return;
		LastFm.getArtistsForUser().then(function(result){
			if (result.valid) {
				DataService.Artists.currentTopArtists = result.data;
				DataService.User.lastSetUserName = DataService.User.userName;
				DataService.User.settingUserName = false;
			}
		});
	}

	$scope.resetUser = function() {
		DataService.User.userName = null;
		DataService.User.settingUserName = true;
		ErrorService.User.errorList.length = 0;
	}
}]);

app.controller('FilterController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.filter = DataService.Filter;
	$scope.user = DataService.User;
	$scope.$watch('filter', function(){
		if (DataService.User.userName) {
			DataService.Artists.currentTopArtists = LastFm.getArtistsForUser();
		}
	}, true);
	
}]);

app.controller('ArtistsController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.artists = DataService.Artists;
	$scope.user = DataService.User;

	$scope.getFirstListen = function(artistName) {
		DataService.Tracks.firstTrack = LastFm.getFirstTrackForArtist(artistName);
	}

	$scope.$watch('user.lastSetUserName', function(newVal, oldVal) {
		if (newVal != oldVal) {
			$scope.accordion.bodyShown = true;
		}
	});
}]);

app.controller('TracksController', ['$scope', 'DataService', function($scope, DataService){		
	$scope.data = {
		tracks: DataService.Tracks,
		user: DataService.User
	}
}]);

