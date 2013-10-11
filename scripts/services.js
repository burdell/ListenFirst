var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.service('DataService', function(){
		return {
			User: { 
				userName: null
			},
			LastFm: {
				apiKey: ""
			}
		}
	});

}());
