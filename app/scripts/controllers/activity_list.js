'use strict';

/**
 * @ngdoc function
 * @name partyBidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partyBidApp
 */
angular.module('partyBidApp')
  .controller('MainCtrl', function ($scope, $location) {

    $scope.actv_create = function() {
    	$location.path('/create');
    };

    $scope.actv_show = function() {
    	$location.path('/register');
    };

    $scope.init_data = function() {
    	$scope.activities = Activity.get_all_items();
    	$scope.is_new = Activity.if_new_item();
    	$scope.actv_name = Activity.get_item_name();
    }

    $scope.init_data();

    $scope.check_when_load = function() {
    	if($scope.is_new){
    		//window.alert("-1");
    	 	var nowDate = new Date();
    	 	//window.alert("0");
    	 	$scope.activities.splice(0,0,{name:$scope.actv_name, createdAt:nowDate.toString()});
    	 	//window.alert("1");
    	 	Activity.save_all_items($scope.activities);
    	 	//window.alert("2");
    	 }
    	if($scope.activities.length == 0){
    		$location.path('/create');
    	}	
    }

    $scope.check_when_load();

  });
