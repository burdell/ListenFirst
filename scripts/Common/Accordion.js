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