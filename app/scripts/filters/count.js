'use strict';

/**
 * @ngdoc filter
 * @name partyBidApp.filter:count
 * @function
 * @description
 * # count
 * Filter in the partyBidApp.
 */
angular.module('partyBidApp')
  .filter('count', function () {
    return function (input) {
      return input > 0? '(' + input.toString() + '人)': '';
    };
  });
