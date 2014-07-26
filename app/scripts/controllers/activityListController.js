'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.activity_create = function () {
    	$location.path('/create');
    };

    $scope.show_activity_detail = function (activity_name) {
    	$location.path('/detail/' + activity_name);
    };

    $scope.check_in_progress = function (register_status, bid_status) {
    	if (register_status == "run" || bid_status == "run") {
    		return "button-flat-highlight";
    	}
    	else {
    		return "button-flat";
    	}
    };

    // $scope.initiate_data = function() {
    $scope.activity_list = activity_list;
    // };

    // $scope.initiate_data();

    $scope.check_when_load = function () {
    	if($scope.activity_list.length == 0){
    		$location.path('/create');
    	}	
    };

    $scope.check_when_load();

  });
