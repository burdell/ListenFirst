var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

app.directive('accordion', function() {
	return {
		restrict: 'E',
		templateUrl: 'accordionHeading.html',
		transclude: true,
		link: function(scope, element, attrs) {
			scope.accordion = {
				bodyShown: !_.isUndefined(attrs.defaultOpen),
				headerText: attrs.headerText
			};
		}
	}
});

app.directive('error', ['ErrorService', function(ErrorService) {
	return {
		restrict: 'E',
		templateUrl: 'error.html',
		scope: true,
		link: function(scope, element, attrs) {
			scope.errorList = ErrorService[attrs.for].errorList;
		}
	}
}]);	