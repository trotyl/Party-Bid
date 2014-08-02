'use strict';

angular.module('partyBidApp')
  .controller('BidListController', function ($scope, $location, $routeParams) {

    $scope.initiate_data = function () {
        $scope.activity_of_page = Activity.find_by_name($routeParams.name);
        $scope.bid_list = Bid.read_bids_of_activity($scope.activity_of_page);
        $scope.cannot_start = Activity.check_if_one_on_progress();
    };

    $scope.check_in_progress = function ($index) {
        return ($scope.activity_of_page.bid == "run" && $index == 0)? "button-flat-highlight": "button-flat";
    };

    $scope.show_bid_detail = function ($index) {
        $location.path(Url.go_to_bid_detail_page($scope.activity_of_page, $scope.activity_of_page.count - $index));
    };

    $scope.back_to_home = function () {
        $location.path(Url.go_to_home_page());
    };

    $scope.navigate_to_register = function () {
        $location.path(Url.go_to_activity_detail_page($scope.activity_of_page));
    };

    $scope.start_bid = function () {
        $scope.activity_of_page.start_bid();
        $location.path(Url.go_to_bid_detail_page($scope.activity_of_page, $scope.activity_of_page.count + 1));
    };

    $scope.initiate_data();

  });
