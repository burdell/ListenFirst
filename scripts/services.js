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
				periodData: [
					{ value: 10, text: "10 artists" },
					{ value: 20, text: "20 artists" },
					{ value: 30, text: "30 artists" },
					{ value: 50, text: "50 artists" }					
				],
				limit: 10,
				limitData: [
					{ value: "7day", text: "1 week" },
					{ value: "1month", text: "1 month" },
					{ value: "3month", text: "3 months" },
					{ value: "6month", text: "6 months" },
					{ value: "12month", text: "1 year" },
					{ value: "overall", text: "All time" }
				]
			},
			Artists: {
				currentTopArtists: []
			},
			Tracks: {
				loading: false,
				firstTrack: null
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
