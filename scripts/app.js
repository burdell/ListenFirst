var ListenFirst = ListenFirst || {};

ListenFirst.app = angular.module('ListenFirst', []); 
ListenFirst.app.value("TimezoneOffset", new Date().getTimezoneOffset());	