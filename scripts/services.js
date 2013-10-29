var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.service('DataService', function(){
		return {
			User: {
				settingUserName: true,
				userName: null,
				lastSetUserName: null
			},
			Filter: {
				period: "overall",
				limit: 10
			},
			Artists: {
				loading: false,
				currentTopArtists: [],

			},
			Tracks: {
				loading: false,
				firstTrack: null
			}
		}
	});

}());
