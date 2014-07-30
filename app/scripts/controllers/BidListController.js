'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {
    $scope.initiate_data = function () {
        $scope.this_activity = Activity.find_by_name($routeParams.name);
        $scope.bid_list = Bid.read_bids_of_activity($scope.this_activity);
        if($scope.this_activity.bid == "run") {
            $scope.cannot_start = true;
        }
        else {
            $scope.cannot_start = false;
        }
    };

    $scope.initiate_data();

    $scope.check_in_progress = function ($index) {
        if ($scope.cannot_start && $index == 0) {
            return "button-flat-highlight";
        }
        else {
            return "button-flat";
        }
    };

    $scope.show_bid_detail = function ($index) {
        $location.path(Url.get_bid($scope.this_activity, $scope.this_activity.count - $index));
    };


    $scope.back_to_home = function () {
        $location.path(Url.get_home());
    };

    $scope.navigate_to_register = function () {
        $location.path(Url.get_activity($scope.this_activity));
    };

    $scope.start_bid = function () {
        Activity.start_bid($scope.this_activity);
        console.log($scope.this_activity.count);
        $location.path(Url.get_bid($scope.this_activity, $scope.this_activity.count + 1));
    };

  });
