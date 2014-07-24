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
				LastFm.setUserData(userName);
				$scope.enteredUserName = null;
			}
		});
	}

	$scope.resetUser = function() {
		DataService.resetUser();
	}
}]);