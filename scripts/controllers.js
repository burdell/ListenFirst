var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.controller('UserController',[ '$scope', 'DataService', function($scope, DataService){
		var user = DataService.User;

		$scope.setUsername = function(userName) {
			user.userName = userName;
		}
	}]);

	app.controller('ArtistsController',[ '$scope', 'DataService', function($scope, DataService){
		$scope.data = DataService.User;
	}]);


}());
