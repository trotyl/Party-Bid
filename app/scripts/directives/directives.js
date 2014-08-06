'use strict';

angular.module('partyBidApp')
	.directive('focus',function() {
		return {
			link: function(scope, element, attrs) {
				element[0].focus();
			}
		};
	});
