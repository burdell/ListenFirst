
function Accordion() {
	function controller() {
		this.bodyShown = this.defaultOpen || false;
	}
	controller.$inject = [];

	var directive = {
			controller: controller,
			restrict: 'E',
			templateUrl: 'accordion/accordion.html',
			scope: true,
			controllerAs: 'accordion',
			bindToController: true,
			replace: true,
			transclude: true,
			scope: {
				defaultOpen: '=',
				headerText: '@'
			}
	};

	return directive;
}

angular.module('listenfirst.directives')
	.directive('accordion', Accordion);
