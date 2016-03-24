
'use strict';

var angular = require('angular');

function LastFmService($http, $q){
	var apiRoot = "http://ws.audioscrobbler.com/2.0/";
	var defaultParams = {
		api_key: "22648f0dcab32971882df69c27c6d8c9",
		format: "json"
	};

	return {
		getArtistData: function(userName, options){
			var artistsParams = angular.extend(
				{ user: userName, method: 'user.gettopartists' },
				options || {},
				defaultParams
			);

			return $http.get(apiRoot, { params: artistsParams }).then(function(result){
				return result.data.topartists;
			})
		},
		getUserData: function(userName, artistOptions){
			var userParams = angular.extend(
				{ user: userName, method: 'user.getinfo' },
				defaultParams
			);
			var userPromise = $http.get(apiRoot, { params: userParams });

			var artistsPromise = this.getArtistData(userName, artistOptions);

			return $q.all([ userPromise, artistsPromise ]).then(function(result){
				return {
					user: result[0].data.user,
					artists: result[1]
				}
			});
		},
		getFirstTrack: function(userName, artist){
			var trackParams = angular.extend(
				{ user: userName, artist: artist, method: 'user.getartisttracks' },
				defaultParams
			);

			return $http.get(apiRoot, { params: trackParams }).then(function(result){
				debugger;
			});
		}
	};
};
LastFmService.$inject = ['$http', '$q'];

var serviceName = 'LastFmService';
angular.module('listenfirst.services')
	.service(serviceName, LastFmService);

module.exports = serviceName;
