'use strict';

angular.module('partyBidApp')
  .controller('BidDetailController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_this_page = Activity.find_by_name($routeParams.name);
		$scope.number_of_bid = parseInt($routeParams.number);
		$scope.can_not_stop = ($scope.this_activity.bid != "run") || ($scope.number_of_bid != $scope.this_activity.count);
		$scope.record_list = Bid.read_records_of_bid($scope.this_activity, $scope.number_of_bid);
	};

	$scope.back_to_bid = function () {
		$location.path(Url.go_to_activity_bids($scope.this_activity));
	};

	$scope.end_bid = function () {
        Activity.stop_bid($scope.this_activity);
        $scope.can_not_stop = ($scope.this_activity.bid != "run") || ($scope.number_of_bid != $scope.this_activity.count);
	};

	$scope.update_when_receive = function () {
		$scope.record_list = Bid.read_records_of_bid($scope.this_activity, $scope.number_of_bid);
		$scope.count_of_records = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
	};

	$scope.initiate_data();

});