'use strict';

angular.module('partyBidApp')
  .controller('BidStatsController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_page = Activity.find_by_name($routeParams.name);
		$scope.number_of_bid = parseInt($routeParams.number);
		$scope.record_list = Bid.read_stats_of_bid($scope.activity_of_page, $scope.number_of_bid);
		$scope.count_of_records = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
	};

	$scope.back_to_bid = function () {
		$location.path(Url.go_to_bid_list_page($scope.activity_of_page));
	};

	$scope.navigate_to_result = function () {
        $location.path(Url.go_to_bid_result_page($scope.activity_of_page, $scope.number_of_bid));
	};

	$scope.initiate_data();

  });