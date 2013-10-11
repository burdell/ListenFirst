var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.factory('LastFm', function(){
		return {
			getArtistsForUser: function(user) {
				return "getArtistsForUser";
			},
			getUserTracksForArtist: function(artist) {
				return "getUserTracksForArtist";
			}
		}
	});
		
}());
