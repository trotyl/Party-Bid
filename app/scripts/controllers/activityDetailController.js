'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.next_status = $scope.this_activity.register == "run"? "结束": "开始";
		$scope.style_of_button = $scope.next_status == "开始"? "button-action": "button-caution";
		$scope.no_start = $scope.next_status == "开始" && Activity.on_going();
		$scope.update_when_receive();
	};

	$scope.back_to_home = function () {
		$location.path(Url.home());
	};

	$scope.navigate_to_bid = function () {
		$location.path(Url.bid_list($scope.this_activity));
	};

	$scope.alter_status = function () {
		var is_to_start = ($scope.next_status == "开始");
		if(is_to_start || window.confirm("确认要结束本次报名吗？！")) {
			$scope.this_activity.turn_register();
			!is_to_start && $scope.navigate_to_bid();
		}
		$scope.initiate_data();
	};

	$scope.update_when_receive = function () {
		$scope.member_list = Register.read_members_of_activity($scope.this_activity);
		$scope.count_of_members = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
	};

	$scope.initiate_data();

  });
