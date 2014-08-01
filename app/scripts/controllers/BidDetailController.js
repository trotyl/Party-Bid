'use strict';

angular.module('partyBidApp')
  .controller('BidDetailController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_this_page = Activity.find_by_name($routeParams.name);
		$scope.number_of_bid = parseInt($routeParams.number);
		$scope.can_not_stop = ($scope.activity_of_this_page.bid != "run") || ($scope.number_of_bid != $scope.activity_of_this_page.count);
		$scope.update_when_receive();
	};

	$scope.back_to_bid = function () {
		$location.path(Url.go_to_bid_list_page($scope.activity_of_this_page));
	};

	$scope.end_bid = function () {
        window.confirm("您确定要结束竞价么？！") && Activity.stop_bid($scope.activity_of_this_page);
        $scope.initiate_data();
	};

	$scope.navigate_to_register = function () {
		$location.path(Url.go_to_activity_detail_page($scope.activity_of_this_page));
	};

	$scope.update_when_receive = function () {
		$scope.record_list = Bid.read_records_of_bid($scope.activity_of_this_page, $scope.number_of_bid);
		$scope.count_of_records = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
	};

	$scope.initiate_data();

});