var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.service('DataService', function(){
		return {
			User: {
				userName: null
			},
			Filter: {
				optionsShown: false,
				period: "overall",
				limit: 10
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

			},
			resetUser: function(){
				this.User.userName = null;
				this.Artists.currentTopArtists = [];
				this.Tracks.firstTrack = null;
				this.Artists.loading = false;
				this.Tracks.loading = false;
				this.Filter.optionsShown = false;
				this.Filter.period = "overall";
				this.Filter.limit = 10;
			}
		}
	});

}());
