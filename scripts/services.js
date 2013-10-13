var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.service('DataService', function(){
		return {
			User: { 
				userName: null
			},
			Artists: {
				currentTopArtists: null
			},
			Tracks: {
				firstTrack: null
			}
		}
	});

}());
