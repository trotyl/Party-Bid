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
      link: function postLink(scope, element, attrs) {
		var path = attrs.back? '#/detail/' + attrs.back + '/bid': '/';
        element.attr('href', path);
      }
    };
  });
