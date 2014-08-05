'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {

    $scope.initiate_data = function () {
        $scope.activity_of_page = Activity.find_by_name($routeParams.name);
        $scope.bid_list = Bid.read_bids_of_activity($scope.activity_of_page);
        $scope.cannot_start = Activity.on_going();
    };

    $scope.back_to_home = function () {
        $location.path(Url.home());
    };

    $scope.show_bid_detail = function ($index) {
        $location.path(Url.bid_detail($scope.activity_of_page, $scope.activity_of_page.count - $index));
    };

    $scope.navigate_to_register = function () {
        $location.path(Url.activity_detail($scope.activity_of_page));
    };

    $scope.check_in_progress = function ($index) {
        return ($scope.activity_of_page.bid == "run" && $index == 0)? "button-flat-highlight": "button-flat";
    };

    $scope.start_bid = function () {
        $scope.activity_of_page.start_bid();
        $location.path(Url.bid_detail_page($scope.activity_of_page, $scope.activity_of_page.count + 1));
    };

    $scope.initiate_data();

  });
