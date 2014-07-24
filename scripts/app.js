var ListenFirst = ListenFirst || {};

ListenFirst.app = angular.module('ListenFirst', ['ui.router']); 
ListenFirst.app.value("TimezoneOffset", new Date().getTimezoneOffset());	
