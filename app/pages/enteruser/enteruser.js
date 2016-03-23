
'use strict';

function EnterUserController($state) {
	var ctrl = this;

	angular.extend(ctrl, {
		enteredUserName: null,
		goToUserPage: function(){
			if (ctrl.enteredUserName) {
				$state.go('selectartist', { userName: ctrl.enteredUserName });
			}
		}
	});
}
EnterUserController.$inject = ['$state'];

require('angular').module('listenfirst.pages')
	.controller('EnterUser', EnterUserController);
