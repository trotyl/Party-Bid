'use strict';

angular.module('partyBidApp')
  .controller('BidDetailController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_page = Activity.find_by_name($routeParams.name);
		$scope.number_of_bid = parseInt($routeParams.number);
		$scope.can_not_stop = ($scope.activity_of_page.bid != "run") || ($scope.number_of_bid != $scope.activity_of_page.count);
		$scope.update_data();
	};

	$scope.back_to_bid = function () {
		$location.path(Url.bid_list_page($scope.activity_of_page));
	};

	$scope.navigate_to_register = function () {
		$location.path(Url.activity_detail_page($scope.activity_of_page));
	};

	$scope.end_bid = function () {
		if(window.confirm("您确定要结束竞价么？！")) {
        	$scope.activity_of_page.stop_bid();
        	$location.path(Url.bid_result_page($scope.activity_of_page, $scope.number_of_bid, true));
		}
	};

	$scope.update_data = function () {
		$scope.record_list = Bid.read_records_of_bid($scope.activity_of_page, $scope.number_of_bid);
		$scope.count_of_records = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
	};

	$scope.initiate_data();

  });