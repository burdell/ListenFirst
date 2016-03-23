
'use strict';

function SelectArtistController($state, userArtistData) {
	var ctrl = this;
	debugger;
	angular.extend(ctrl, {

	});
}
SelectArtistController.$inject = ['$state', 'UserArtistData'];

require('angular').module('listenfirst.pages')
	.controller('SelectArtist', SelectArtistController);


// angular.module(ListenFirst.appName).service('FilterService', function(){
// 	return {
// 		artistNumberOptions: [
// 			{ text: "10 artists", value: 10 },
// 			{ text: "20 artists", value: 20 },
// 			{ text: "30 artists", value: 30 },
// 			{ text: "50 artists", value: 50 },
// 		],
// 		timePeriodOptions: [
// 			{ text: "1 weeks", value: "7day" },
// 			{ text: "1 month", value: "1month" },
// 			{ text: "3 months", value: "3month" },
// 			{ text: "1 year", value: "1 years" },
// 			{ text: "All time", value: "overall" }
//
// 		]
// 	}
// });
