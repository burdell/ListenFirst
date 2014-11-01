angular.module(ListenFirst.appName).controller('FilterController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
	$scope.filter = DataService.Filter;
	$scope.user = DataService.User;

	$scope.$watch('filter', function(){
		if (DataService.User.userName) {
			LastFm.getArtistsForUser();
		}
	}, true);
	
}]);