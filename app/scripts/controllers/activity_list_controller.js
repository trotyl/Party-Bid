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
    	$scope.warn_info = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 6);
    	if($scope.activities.length == 0){
    		$location.path('/create');
    	}	
    };

    $scope.check_when_load();

  });
