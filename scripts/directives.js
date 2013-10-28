var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

app.directive('accordion', function() {
	return {
		restrict: 'E',
		templateUrl: 'accordionHeading.html',
		transclude: true,
		link: function(scope, element, attrs) {
			scope.accordion = {
				optionsShown: false,
				headerText: attrs.headerText
			};
		}
	}
});