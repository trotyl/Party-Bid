'use strict';

function BidDetailController ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.bid_number = parseInt($routeParams.number);
		$scope.no_stop = ($scope.this_activity.bid != "run") || ($scope.bid_number != $scope.this_activity.count);
		$scope.update_data();
	};

	$scope.end_bid = function () {
		if(window.confirm("您确定要结束竞价么？！")) {
        	$scope.this_activity.stop_bid();
        	$location.path(Url.bid_result($scope.this_activity, $scope.bid_number, true));
		}
	};

	$scope.update_data = function () {
		$scope.record_list = Bid.read_records_of_bid($scope.this_activity, $scope.bid_number);
	};

	$scope.initiate_data();

  };