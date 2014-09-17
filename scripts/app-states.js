
angular.module(ListenFirst.appName)
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state("enterUser", {
				url: "/",
				templateUrl: "templates/enterUser.html",
				controller: "UserController"
			})
			.state("user", {
				url: "/user/{userName}",
				templateUrl: "templates/artistList.html",
				controller: "ArtistsController",
				resolve: {
					UserData: ['$stateParams', 'LastFm', function($stateParams, LastFm){
						return LastFm.getUserData($stateParams.userName);
					}],
					ArtistData: ['$stateParams', 'LastFm', function($stateParams, LastFm){
						return LastFm.getArtistsForUser($stateParams.userName);
					}]
				}
			})
		}
	]);

