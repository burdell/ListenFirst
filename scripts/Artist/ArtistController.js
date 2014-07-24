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