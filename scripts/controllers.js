var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.controller('UserController', ['$scope', 'DataService', 'LastFm', function($scope, DataService, LastFm){
		var user = DataService.User;

		$scope.setUsername = function(userName) {
			user.topArtists = LastFm.getArtistsForUser(userName);
		}
	}]);

	app.controller('ArtistsController', ['$scope', 'DataService', function($scope, DataService){
		$scope.data = DataService.User.topArtists;
	}]);
}());
