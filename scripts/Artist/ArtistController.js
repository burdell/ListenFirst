angular.module(ListenFirst.appName).controller('ArtistsController', 
	['$scope', 'UserData', 'LastFm', 'ErrorService', function($scope, UserData, LastFm, ErrorService){
		$scope.user = UserData;
		loadArtistsForUser();
		
		function loadArtistsForUser(){
			LastFm.getArtistsForUser(UserData.name).then(function(result){
				ErrorService.User.validate(result);
				$scope.topArtists = result.data.topartists.artist;
			});
		};
}]);