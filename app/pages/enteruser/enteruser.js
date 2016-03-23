
'use strict';

function EnterUserController() {
	console.log('here');
}
EnterUserController.$inject = [];

require('angular').module('listenfirst.pages')
	.controller('EnterUserController', EnterUserController);
