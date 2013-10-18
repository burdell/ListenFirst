var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.service('DataService', function(){
		return {
			User: {
				userName: null
			},
			Artists: {
				loading: false,
				currentTopArtists: []
			},
			Tracks: {
				loading: false,
				firstTrack: null
			},
			cache: {

			}
		}
	});

}());
