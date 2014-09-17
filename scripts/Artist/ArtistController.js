angular.module(ListenFirst.appName).controller('ArtistsController', 
	['$scope', 'UserData', 'ArtistData', function($scope, UserData, ArtistData){
		$scope.user = UserData;
		$scope.topArtists = ArtistData;
	}]);