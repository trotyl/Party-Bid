'use strict';

/**
 * @ngdoc filter
 * @name partyBidApp.filter:yello
 * @function
 * @description
 * # yello
 * Filter in the partyBidApp.
 */
angular.module('partyBidApp')
  .filter('yello', function () {
    return function (input) {
      return input.register == 'run' || input.bid == 'run'?
      	'button glow button-rounded btn-block button-large button-flat-highlight':
      	'button glow button-rounded btn-block button-large button-flat';
    };
  });
