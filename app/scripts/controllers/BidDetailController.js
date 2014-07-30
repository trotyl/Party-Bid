'use strict';

angular.module('partyBidApp')
  .controller('BidDetailController', function ($scope, $location, $routeParams) {

	$scope.status_to_watch;

	$scope.initiate_data = function () {
		$scope.this_activity = Activity.find_by_name($routeParams.name);
		$scope.bid_number = $routeParams.number;

	};

	$scope.back_to_bid = function () {
		$location.path(Url.get_activity_bids($scope.this_activity));
	};

	$scope.end_bid = function () {
        Activity.stop_bid($scope.this_activity);
	};

	$scope.initiate_data();
});