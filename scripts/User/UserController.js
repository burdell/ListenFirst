
angular.module(ListenFirst.appName)
	.controller('UserController', ['$scope', '$state', 'LastSetUser', function($scope, $state, LastSetUser){
		$scope.goToUserPage = function(){
			if ($scope.enteredUserName) {
				$state.go("user", { userName: $scope.enteredUserName });
			}
		};

		$scope.LastSetUser = LastSetUser;
	}
]);