
angular.module(ListenFirst.appName)
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state("enterUser", {
				url: "/",
				templateUrl: "templates/enterUser.html",
				controller: "UserController"
			})
			.state("artistsForUser", {
				url: "/user/{userName}",
				templateUrl: "templates/artistList.html",
				controller: "ArtistsController"
			})
		}
	]);

