'use strict';

angular.module('partyBidApp')
  .controller('BidResultController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_this_page = Activity.find_by_name($routeParams.name);
		$scope.number_of_bid = parseInt($routeParams.number);
		$scope.record_list = Bid.read_records_of_bid($scope.activity_of_this_page, $scope.number_of_bid);
		$scope.count_of_records = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
		$scope.result = Bid.compute_result($scope.activity_of_this_page, $scope.number_of_bid);
	};

	$scope.back_to_bid = function () {
		$location.path(Url.go_to_bid_list_page($scope.activity_of_this_page));
	};

	$scope.navigate_to_stats = function () {
        $location.path(Url.go_to_bid_stats_page($scope.activity_of_this_page, $scope.number_of_bid));
	};

	$scope.initiate_data();

});