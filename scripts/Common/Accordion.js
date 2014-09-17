angular.module(ListenFirst.appName)
	.directive('accordion', function() {
		return {
			restrict: 'E',
			templateUrl: '/templates/accordionHeading.html',
			transclude: true,
			link: function(scope, element, attrs) {
				scope.accordion = {
					bodyShown: !_.isUndefined(attrs.defaultOpen),
					headerText: attrs.headerText
				};
			}
		}
	});