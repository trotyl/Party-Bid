'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.activity_list = Activity.get_all_items();
        _.isEmpty($scope.activity_list) && $location.path(Url.go_to_create_activity_page());
        $scope.cannot_create = Activity.check_if_one_on_progress();
        $scope.names = ["竞价1", "竞价2", "竞价3"];
    };

    $scope.activity_create = function () {
    	$location.path(Url.go_to_create_activity_page());
    };

    $scope.show_activity_detail = function (the_activity) {
    	$location.path(Url.go_to_activity_detail_page(the_activity));
    };

    $scope.check_in_progress = function (the_activity) {
    	if (the_activity.register == "run" || the_activity.bid == "run") {
    		return "button-flat-highlight";
    	}
    	else {
    		return "button-flat";
    	}
    };

    $scope.initiate_data();

  });
