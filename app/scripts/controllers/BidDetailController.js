'use strict';

angular.module('partyBidApp')
  .controller('BidDetailController', function ($scope, $location, $routeParams) {

	$scope.status_to_watch;

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.bid_number = parseInt($routeParams.number);
		$scope.can_not_stop = ($scope.this_activity.bid != "run") || ($scope.bid_number != $scope.this_activity.count)
		$scope.record_list = Bid.read_records_of_bid($scope.this_activity, $scope.bid_number);
	};

	$scope.initiate_data();

	$scope.back_to_bid = function () {
		$location.path(Url.get_activity_bids($scope.this_activity));
	};

	$scope.end_bid = function () {
        Activity.stop_bid($scope.this_activity);
        $scope.can_not_stop = ($scope.this_activity.bid != "run") || ($scope.bid_number != $scope.this_activity.count)
	};

});