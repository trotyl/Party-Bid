'use strict';

angular.module('partyBidApp')
  .controller('BidResultController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.activity_of_page = Activity.find_by_name($routeParams.name);
		$scope.number_of_bid = parseInt($routeParams.number);
		$scope.record_list = Bid.read_records_of_bid($scope.activity_of_page, $scope.number_of_bid);
		$scope.count_of_records = !_.isEmpty($scope.member_list)? "(" + $scope.member_list.length.toString() + "人)": "";
		$scope.result = Bid.compute_result($scope.activity_of_page, $scope.number_of_bid);
		
		if ($routeParams.new == 'true') {
			$scope.is_modal_over = false;
			$('#myModal').modal('show');
			window.setTimeout(function () { $scope.modal_close(); }, 3000);
		}
		else {
			$scope.is_modal_over = true;
		}	
	};

	$scope.back_to_bid = function () {
		$location.path(Url.bid_list_page($scope.activity_of_page));
	};

	$scope.navigate_to_stats = function () {
        $location.path(Url.bid_stats_page($scope.activity_of_page, $scope.number_of_bid));
	};

	$scope.modal_close = function () {
		$('#myModal').modal('hide');
		$scope.$apply(function() {$scope.is_modal_over = true;});
	};

	$scope.manual_close = function () {
		$scope.is_modal_over = true;
	};

	$scope.initiate_data();

  });