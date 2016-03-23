
var angular = require('angular');


var baseTag = document.createElement('base');
baseTag.setAttribute('href', '/');
document.head.appendChild(baseTag);

var moduleBuilder = require('utils/modulebuilder');

angular.module('ListenFirst', [
		require('angular-ui-router'),
		'listenfirst.templates',
		moduleBuilder('listenfirst.directives'),
		moduleBuilder('listenfirst.services'),
		moduleBuilder('listenfirst.pages')
])
.config([function(){

}])
.run([function(){
}]);


angular.element(document).ready(function(){
		angular.bootstrap(document, ['ListenFirst']);
});
