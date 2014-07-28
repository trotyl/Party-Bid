'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {
    $scope.initiate_data = function () {
        $scope.this_activity = Activity.find_by_name($routeParams.name);
        $scope.bid_list = Bid.read_activity_bids($scope.this_activity);
        if($scope.this_activity.bid == "run") {
            $scope.cannot_start = true;
        }
        else {
            $scope.cannot_start = false;
        }
        console.log(Activity.get_status_refer());
        console.log($scope.cannot_start);
    };

    $scope.initiate_data();

    $scope.check_in_progress = function ($index) {
        console.log($index);
        console.log($scope.this_activity.count - 1);
        if ($scope.cannot_start && $index == 0) {
            return "button-flat-highlight";
        }
        else {
            return "button-flat";
        }
    };


    $scope.back_to_home = function () {
        $location.path(Url.get_home());
    };

    $scope.bid_start = function () {
        var bid_number = Activity.start_bid($scope.this_activity);
        $location.path(Url.get_bid($scope.this_activity, bid_number));
    };

  });
