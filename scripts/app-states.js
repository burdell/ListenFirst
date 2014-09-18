
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
					UserData: ['$stateParams', '$state', 'LastFm', 'ErrorService', function($stateParams, $state, LastFm, ErrorService){
						return LastFm.getUserData($stateParams.userName).then(function(result){
							var validUser = ErrorService.User.validate(result);
							if (validUser) {
								return result.data.user;
							} else {
								$state.go("enterUser");
							}
						});
					}]
				}
			})
		}
	]);

