angular.module(ListenFirst.appName).controller('ArtistsController', 
	['$scope', '$stateParams', '$state', 'LastFm', function($scope, params, $state, LastFm){
		$scope.loadingUserTracks = true;

		LastFm.getArtistsForUser(params.userName).then(function(validUser){
			$scope.loadingUserTracks = false;
			if (validUser) {
				$scope.currentUser = params.userName;
			} else {
				$state.go("enterUser")
			}
		});
}]);