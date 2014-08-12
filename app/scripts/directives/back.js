'use strict';

/**
 * @ngdoc directive
 * @name partyBidApp.directive:back
 * @description
 * # back
 */
angular.module('partyBidApp')
  .directive('back', function () {
    return {
      template: '返回',
      restrict: 'A',
      scope: {

      },
      link: function postLink(scope, element, attrs) {
		var path = attrs.back? Url.bid_list({name: attrs.back}): '/';
        element.attr('href', path);
      }
    };
  });
