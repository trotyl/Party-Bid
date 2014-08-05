'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.activity_list = Activity.all();
        !Activity.exist() && $location.path(Url.create_activity_page());

        $scope.cannot_create = Activity.check_if_one_on_progress();
    };

    $scope.activity_create = function () {
    	$location.path(Url.create_activity_page());
    };

    $scope.show_activity_detail = function (the_activity) {
    	$location.path(Url.activity_detail_page(the_activity));
    };

    $scope.check_in_progress = function (the_activity) {
    	return (the_activity.register == "run" || the_activity.bid == "run")? "button-flat-highlight": "button-flat";
    };

    $scope.initiate_data();

  });
