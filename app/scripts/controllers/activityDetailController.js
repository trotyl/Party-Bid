'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location, $routeParams) {

	$scope.status_to_watch;

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.start_or_stop = $scope.this_activity.register == "run"? "结束": "开始";
		$scope.status_to_watch = $scope.start_or_stop;

		if($scope.start_or_stop == "开始") {
			$scope.red_or_green = "button-action"; 
			if(Activity.check_if_one_on_progress()) {
				$scope.can_not_start = true;
			}
		}
		else {
			$scope.red_or_green = "button-caution";
		}

	};

	$scope.initiate_data();

	$scope.back_to_home = function () {
		$location.path(Url.get_home());
	};

	$scope.alter_activity_status = function () {
		if ($scope.start_or_stop == "开始") {
			$scope.status_to_watch = "结束";
			$scope.red_or_green = "button-caution";
			Activity.start_register($scope.this_activity);
		}
		else {
			if (window.confirm("确认要结束本次报名吗？！")) {
				$scope.status_to_watch = "开始";
				$scope.red_or_green = "button-action";
				Activity.stop_register($scope.this_activity);
				$scope.navigate_to_bid();
			}
		}
	};

	$scope.navigate_to_bid = function () {
		$location.path(Url.get_activity_bids($scope.this_activity));
	};

	$scope.update_when_receive = function () {
		$scope.message_list = Register.read_members_of_activity($scope.this_activity);
		if($scope.message_list.length != 0) {
			$scope.member_count = "(".concat($scope.message_list.length.toString()).concat("人)");
		}
		else {
			$scope.member_count = "";
		}
	};

	$scope.update_when_receive();

	function check_if_alter(newValue, oldValue, scope) {
		$scope.start_or_stop = $scope.status_to_watch;
	};

	$scope.$watch('status_to_watch', check_if_alter, true);

  });
