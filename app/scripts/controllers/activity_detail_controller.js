'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location) {

    $scope.back_to_home = function() {
      $location.path('/');
    };


  });
