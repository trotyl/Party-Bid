'use strict';

/**
 * @ngdoc function
 * @name partyBidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partyBidApp
 */
angular.module('partyBidApp')
  .controller('ActvRegrCtrl', function ($scope, $location) {

    $scope.back_to_home = function() {
      $location.path('/');
    }


  });
