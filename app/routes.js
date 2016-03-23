
'use strict';

require('angular-ui-router');

function config($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('listenfirst', {
			url: '/',
			templateUrl: 'enteruser/enteruser.html',
			controller: 'EnterUserController as vm'
		})
}
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];


require('angular').module('listenfirst.pages')
	.config(config);
