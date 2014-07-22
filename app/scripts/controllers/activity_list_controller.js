'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.activity_create = function () {
    	$location.path('/create');
    };

    $scope.show_activity_detail = function (activity_name) {
    	$location.path('/detail/' + activity_name);
    };

    $scope.check_in_progress = function (status) {
    	if (status == "run") {
    		return "btn btn-block btn-lg btn-warning";
    	}
    	else {
    		return "btn btn-block btn-lg btn-info";
    	}
    };

    $scope.initiate_data = function() {
    	$scope.activities = Activity.get_all_items();
    };

    $scope.initiate_data();

    $scope.check_when_load = function () {
    	if($scope.activities.length == 0){
    		$location.path('/create');
    	}	
    };

    $scope.check_when_load();

  });
