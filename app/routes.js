
'use strict';

var lastFmServiceName = require('services/LastFm');

function config($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('enteruser', {
			url: '/',
			templateUrl: 'enteruser/enteruser.html',
			controller: 'EnterUser as vm'
		})
		.state('selectartist', {
			url: '/user/:userName',
			templateUrl: 'selectartist/selectartist.html',
			controller: 'SelectArtist as vm',
			resolve: {
				UserArtistData: [lastFmServiceName, '$stateParams', function(LastFm, $stateParams){
					return LastFm.getUserData($stateParams.userName);
				}]
			}
		})
		.state('selectartist.listeningdata', {
			url: '/artist/:artistId',
			templateUrl: 'listeningdata/listeningdata.html',
			controller: 'ListeningData as vm',
			resolve: {
				ListeningData: [lastFmServiceName, '$stateParams', function(LastFm, $stateParams){
					return LastFm.getFirstTrack($stateParams.userName, $stateParams.artistId);
				}]
			}
		})
}
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];


require('angular').module('listenfirst.pages')
	.config(config);
