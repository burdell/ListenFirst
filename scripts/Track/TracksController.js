angular.module(ListenFirst.appName).controller('TracksController', ['$scope', 'DataService', function($scope, DataService){		
	$scope.tracks = DataService.Tracks;
	$scope.user = DataService.User;
}]);
