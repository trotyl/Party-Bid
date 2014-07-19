'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.activity_create = function() {
    	$location.path('/create');
    };

    $scope.show_activity_detail = function() {
    	$location.path('/detail');
    };

    $scope.initital_data = function() {
    	$scope.activities = Activity.get_all_items();
    	$scope.is_new = Activity.if_new_item();
    	$scope.actv_name = Activity.get_item_name();
    };

    $scope.initital_data();

    $scope.check_when_load = function() {
    	if($scope.is_new){
    	 	var nowDate = new Date();
    	 	$scope.activities.splice(0,0,{name:$scope.actv_name, createdAt:nowDate.toString()});
    	 	Activity.save_all_items($scope.activities);
    	 }
    	if($scope.activities.length == 0){
    		$location.path('/create');
    	}	
    };

    $scope.check_when_load();

  });
