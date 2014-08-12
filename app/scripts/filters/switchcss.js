'use strict';

/**
 * @ngdoc filter
 * @name partyBidApp.filter:switchCss
 * @function
 * @description
 * # switchCss
 * Filter in the partyBidApp.
 */
angular.module('partyBidApp')
  .filter('switchCss', function () {
    return function (input) {
      return 'button button-rounded rightside ' + (input == 'run'? 'button-caution': 'button-action');
    };
  });
