'use strict';

/**
 * @ngdoc filter
 * @name partyBidApp.filter:switch
 * @function
 * @description
 * # switch
 * Filter in the partyBidApp.
 */
angular.module('partyBidApp')
  .filter('switch', function () {
    return function (input) {
      return input == 'run'? '结束': '开始';
    };
  });
