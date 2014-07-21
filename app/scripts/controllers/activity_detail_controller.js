'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location) {

    $scope.back_to_home = function() {
    	$location.path('/');
    };

    $scope.start_activity = function() {
    	Activity.update_activity_status();
    }

  });
