
angular.module(ListenFirst.appName, ['ui.router'])
	.value("TimezoneOffset", new Date().getTimezoneOffset());	
