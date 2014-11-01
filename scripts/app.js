window.ListenFirst = {
	appName: "ListenFirst"
}

angular.module(ListenFirst.appName, ['ui.router'])
	.value("TimezoneOffset", new Date().getTimezoneOffset())
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state("enterUser", {
					url: "/",
					templateUrl: "enterUser.html",
					controller: "UserController",
					resolve: {
						LastSetUser: ['DataService', function(DataService) {
							return DataService.User.LastSetUser;
						}]
					}
				})
				.state("user", {
					url: "/user/{userName}",
					templateUrl: "artistList.html",
					controller: "ArtistsController",
					resolve: {
						UserData: ['$stateParams', '$state', 'LastFm', 'ErrorService', 'DataService', function($stateParams, $state, LastFm, ErrorService, DataService){
							var userName = $stateParams.userName;
							return LastFm.getUserData(userName).then(function(result){
								var validUser = ErrorService.User.validate(result);
								if (validUser) {
									var userData = result.data.user;
									DataService.User.LastSetUser = userData.name;
									return userData;
								} else {
									$state.go("enterUser");
								}
							});
						}]
					}
				})
			}
		])