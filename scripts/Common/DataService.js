angular.module(ListenFirst.appName)
	.service('DataService', ['ErrorService', 'TimezoneOffset', function(errorService, timezoneOffset){
			return {
				User: {
					settingUserName: true,
					userName: null,
					totalTracks: null,
					imageUrl: null,
					joinDate: null,
					realName: null,
					loading: false,
				},
				Filter: {
					period: "overall",
					limit: 20
				},
				Artists: {
					currentTopArtists: []
				},
				Tracks: {
					artistName: null,
					firstTrack: null,
					lastTrack: null,
					loading: false,
					artistImageUrl: "",
					artistPlayCount: null,
					timezoneOffset: null,
					setTrack: function(track, whichTrack) {
						var dateMoment = moment(track.date['#text']).subtract('minutes', timezoneOffset);
						track.date['#text'] = dateMoment.format("MMMM D, YYYY") + " (" + dateMoment.fromNow() + ")";
						this[whichTrack] = track;
					},
					resetTrack: function(){
						this.firstTrack = null;
						this.lastTrack = null;
						this.artistImageUrl = "";
						this.artistPlayCount = null;
						errorService.Track.errorList.length = 0;
						this.artistName = null;
					}
				},
				resetUser: function(){
					this.User.settingUserName = true;
					errorService.User.errorList.length = 0;
				}
			}
		}]);

