var ListenFirst = ListenFirst || {};
var app = ListenFirst.app;

(function(){

	app.service('DataService', function(){
		return {
			User: {
				settingUserName: true,
				userName: null,
				lastSetUserName: null,
				loading: false,
			},
			Filter: {
				period: "overall",
				limit: 10
			},
			Artists: {
				currentTopArtists: []
			},
			Tracks: {
				loading: false,
				firstTrack: null,
				artistImageUrl: "",
				artistPlayCount: null,
				setFirstTrack: function(firstTrack) {
					var dateMoment = moment(firstTrack.date['#text']);
					firstTrack.date['#text'] = dateMoment.format("MMMM D, YYYY") + " (" + dateMoment.fromNow() + ")";
					this.firstTrack = firstTrack;
				}
			}
		}
	});

	app.service('ErrorService', function(){
		return {
			User: {
				errorList: [],
				validate: function(dataResult) {
					this.errorList.length = 0;
					switch(dataResult.data.error){
						case 10:
							this.errorList.push("Looks like you entered a username with some invalid characters :(");
							break;
						case 6:
							this.errorList.push("Looks like you entered a username that doesn't exist :(");
							break;
					}
					if (this.errorList.length == 0) {
						var artists = dataResult.data.topartists; 
						if (Number(artists.total) == 0) {
							this.errorList.push(artists.user + " does not have any artists in their library :(")
						}
					} 
					return this.errorList.length == 0;
				}
			},
			Artist: {
				errorList: [],
				validate: function(dataResult){
					this.errorList.length = 0;
					switch(dataResult.data.error){
						case 6:
							this.errorList.push("Looks like you entered an artist that doesn't exist :(");
							break;
					}
					return this.errorList.length == 0;
				}
			},
			Track: {
				errorList: [],
				validate: function(dataResult) {
					//weird...some users will have artists as listened to, but no actual listens...
					//wonder if it's test data. they all seem to be users like 'tim', and 'billy'
					this.errorList.length = 0;
					var tracks = dataResult.data.artisttracks;
					if (Number(tracks.total) == 0){
						this.errorList.push("Looks like " + tracks.user + " hasn't actually listend to " + tracks.artist + " :(");
					}
					return this.errorList.length == 0;
				}
			}
		}
	});

}());
