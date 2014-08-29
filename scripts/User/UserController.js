angular.module(ListenFirst.appName)
	.controller('UserController', ['$scope', '$state', function($scope, $state){
		$scope.goToUserPage = function(){
			if ($scope.enteredUserName) {
				$state.go("artistsForUser", { userName: $scope.enteredUserName });
			}
		};
	}
]);