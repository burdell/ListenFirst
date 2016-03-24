
'use strict';

require('directives/accordion/accordion');

function SelectArtistController($state, userData, LastFm) {
	var ctrl = this;

	angular.extend(ctrl, {
		user: userData.user,
		artistData: userData.artists,
		artistFilter: {
			limit: 50,
			period: 'overall'
		},
		filterOptions: {
				artistNumber: [
					{ text: "10 artists", value: 10 },
					{ text: "20 artists", value: 20 },
					{ text: "30 artists", value: 30 },
					{ text: "50 artists", value: 50 },
				],
				timePeriod: [
					{ text: "1 weeks", value: "7day" },
					{ text: "1 month", value: "1month" },
					{ text: "3 months", value: "3month" },
					{ text: "6 months", value: "6month" },
					{ text: "1 year", value: "12month" },
					{ text: "All time", value: "overall" }
				]
			},
			filterArtists: function(){
				LastFm.getArtistData(ctrl.user.name, ctrl.artistFilter).then(function(result){
					ctrl.artistData = result;
				});
			}
	});
}
SelectArtistController.$inject = ['$state', 'UserArtistData', require('services/LastFm')];

require('angular').module('listenfirst.pages')
	.controller('SelectArtist', SelectArtistController);
