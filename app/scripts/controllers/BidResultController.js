'use strict';

angular.module('partyBidApp')
  .controller('BidResultController', function ($scope, $location, $routeParams) {

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.bid_number = parseInt($routeParams.number);
		$scope.record_list = Bid.read_records_of_bid($scope.this_activity, $scope.bid_number);
		$scope.count_of_records = !_.isEmpty($scope.record_list)? "(" + $scope.record_list.length.toString() + "人)": "";
		$scope.result = Bid.compute_result($scope.this_activity, $scope.bid_number);
		$scope.is_modal_over = $routeParams.new != 'true';
		if (!$scope.is_modal_over) {
			$('#myModal').modal('show');
			window.setTimeout(function () {$scope.$apply($scope.modal_close)}, 3000);
		}
	};

	$scope.go_to_bid = function () {
		$location.path(Url.bid_list($scope.this_activity));
	};

	$scope.go_to_stats = function () {
        $location.path(Url.bid_stats($scope.this_activity, $scope.bid_number));
	};

	$scope.modal_close = function () {
		$('#myModal').modal('hide');
		$scope.is_modal_over = true;
	};

	$scope.initiate_data();

  });
