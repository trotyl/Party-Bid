'use strict';

angular.module('partyBidApp')
  .controller('BidStatsController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.bid_number = parseInt($routeParams.number);
		$scope.record_list = Bid.read_stats_of_bid($scope.this_activity, $scope.bid_number);
		$scope.count_of_records = !_.isEmpty($scope.record_list)? "(" + $scope.record_list.length.toString() + "人)": "";
		$scope.result = Bid.compute_result($scope.this_activity, $scope.bid_number);
	};

	$scope.go_to_list = function () {
		$location.path(Url.bid_list($scope.this_activity));
	};

	$scope.go_to_result = function () {
        $location.path(Url.bid_result($scope.this_activity, $scope.bid_number, false));
	};

	$scope.initiate_data();

  });