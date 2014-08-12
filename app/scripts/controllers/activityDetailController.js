'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.status = $scope.this_activity.register;
		$scope.no_start = $scope.status != "run" && Activity.on_going();
		$scope.update_data();
	};

	$scope.go_to_bid = function () {
		$location.path(Url.bid_list($scope.this_activity));
	};

	$scope.alter_status = function () {
		if($scope.status != "run" || window.confirm("确认要结束本次报名吗？！")) {
			$scope.this_activity.turn_register();
			$scope.status == "run" && $scope.go_to_bid();
			$scope.initiate_data();
		}	
	};

	$scope.update_data = function () {
		$scope.member_list = Register.read_members_of_activity($scope.this_activity);
	};

	$scope.initiate_data();

  });
