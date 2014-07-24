app.directive('error', ['ErrorService', function(ErrorService) {
	return {
		restrict: 'E',
		templateUrl: 'templates/error.html',
		scope: true,
		link: function(scope, element, attrs) {
			scope.errorList = ErrorService[attrs.for].errorList;
		}
	}
}]);