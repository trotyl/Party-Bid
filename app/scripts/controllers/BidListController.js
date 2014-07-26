'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {
    $scope.initiate_data = function () {
        $scope.activity_name = $routeParams.name;
        $scope.bid_list = Bid.read_activity_bids($scope.activity_name);
    };

    $scope.back_to_activity = function () {
        $location.path('/detail/' + $scope.activity_name);
    };

    $scope.initiate_data();
  });
