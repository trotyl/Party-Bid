'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {
    $scope.initiate_data = function () {
        $scope.activity_name = $routeParams.name;
        $scope.bid_list = Bid.read_activity_bids($scope.activity_name);
    };

    $scope.back_to_home = function () {
        $location.path('/');
    };

    $scope.bid_start = function () {
        var bid_detail_url = Activity.start_bid($scope.activity_name);
        console.log(bid_detail_url);
        $location.path(bid_detail_url);
    };

    $scope.initiate_data();
  });
