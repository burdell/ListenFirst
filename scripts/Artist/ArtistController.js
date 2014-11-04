angular.module(ListenFirst.appName).service('FilterService', function(){
	return {
		artistNumberOptions: [
			{ text: "10 artists", value: 10 },
			{ text: "20 artists", value: 20 },
			{ text: "30 artists", value: 30 },
			{ text: "50 artists", value: 50 },
		],
		timePeriodOptions: [
			{ text: "1 weeks", value: "7day" },
			{ text: "1 month", value: "1month" },
			{ text: "3 months", value: "3month" },
			{ text: "1 year", value: "1 years" },
			{ text: "All time", value: "overall" }

		]  
	}
});

angular.module(ListenFirst.appName).controller('ArtistsController', 
	['$scope', 'UserData', 'LastFm', 'ErrorService', 'FilterService', function($scope, UserData, LastFm, ErrorService, FilterService){
		$scope.user = UserData;
		loadArtistsForUser();
		
		function loadArtistsForUser(){
			LastFm.getArtistsForUser(UserData.name).then(function(result){
				ErrorService.User.validate(result);
				$scope.topArtists = result.data.topartists.artist;
			});
		};

		//filter stuff
		$scope.filter = FilterService;
		
		$scope.applyFilter = function(){
			console.log(FilterService);
		};
}]);