

'use strict';
var angular = require('angular');

function LastFmService($http){
	var apiRoot = "http://ws.audioscrobbler.com/2.0/";
	var defaultParams = {
		api_key: "22648f0dcab32971882df69c27c6d8c9",
		format: "json"
	}

	return {
		getTopArtists: function(userName, options){
			var callOptions = angular.extend(
				defaultParams,
				{ user: userName, method: 'user.gettopartists' },
				options || {}
			);

			return $http.get(apiRoot, { params: callOptions }).then(function(result){
				return result.data.topartists;
			});
		}
	};
};
LastFmService.$inject = ['$http'];

var serviceName = 'LastFmService';
angular.module('listenfirst.services')
	.service(serviceName, LastFmService);

module.exports = serviceName;
