'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {

    $scope.initiate_data = function () {
        $scope.this_activity = Activity.find_by_name($routeParams.name);
        $scope.bid_list = Bid.read_bids_of_activity($scope.this_activity);
        $scope.no_start = Activity.on_going();
    };

    $scope.go_home = function () {
        $location.path(Url.home());
    };

    $scope.go_to_detail = function ($index) {
        $location.path(Url.bid_detail($scope.this_activity, $scope.this_activity.count - $index));
    };

    $scope.go_to_register = function () {
        $location.path(Url.activity_detail($scope.this_activity));
    };

    $scope.start_bid = function () {
        $scope.this_activity.start_bid();
        $location.path(Url.bid_detail($scope.this_activity, $scope.this_activity.count + 1));
    };

    $scope.check_status = function ($index) {
        return ($scope.this_activity.bid == "run" && $index == 0)? "button-flat-highlight": "button-flat";
    };

    $scope.initiate_data();

  });
