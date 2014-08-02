'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_page = Activity.find_by_name($routeParams.name);
		$scope.display_of_button = $scope.activity_of_page.register == "run"? "结束": "开始";
		$scope.status_to_watch = $scope.display_of_button;
		$scope.style_of_button = $scope.display_of_button == "开始"? "button-action": "button-caution";
		$scope.can_not_start = $scope.display_of_button == "开始"? Activity.check_if_one_on_progress(): false;
		$scope.update_when_receive();
	};

	$scope.back_to_home = function () {
		$location.path(Url.go_to_home_page());
	};

	$scope.alter_activity_status = function () {
		console.log($scope.activity_of_page);
		var is_to_start = $scope.display_of_button == "开始";
		(is_to_start || window.confirm("确认要结束本次报名吗？！")) && $scope.start_alter_status(is_to_start);
	};

	$scope.start_alter_status = function(is_to_start) {
		$scope.status_to_watch = is_to_start? "结束": "开始";
		$scope.style_of_button = is_to_start? "button-caution": "button-action";
		if (is_to_start) {
			$scope.activity_of_page.start_register();
		}
		else {
			$scope.activity_of_page.stop_register();
			$scope.navigate_to_bid();
		}
	};

	$scope.navigate_to_bid = function () {
		$location.path(Url.go_to_bid_list_page($scope.activity_of_page));
	};

	$scope.update_when_receive = function () {
		$scope.member_list = Register.read_members_of_activity($scope.activity_of_page);
		$scope.count_of_members = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
	};

	function check_if_alter(newValue, oldValue, scope) {
		$scope.display_of_button = $scope.status_to_watch;
	};

	$scope.initiate_data();

	$scope.$watch('status_to_watch', check_if_alter, true);

  });
