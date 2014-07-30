'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.activity_list = Activity.get_all_items();
        if($scope.activity_list.length == 0){
            $location.path(Url.get_create());
        }
        if(Activity.check_if_one_on_progress()) {
            $scope.cannot_create = true;
        }
        else {
            $scope.cannot_create = false;
        }
    };

    $scope.initiate_data();

    $scope.activity_create = function () {
    	$location.path(Url.get_create());
    };

    $scope.show_activity_detail = function (the_activity) {
    	$location.path(Url.get_activity(the_activity));
    };

    $scope.check_in_progress = function (the_activity) {
    	if (the_activity.register == "run" || the_activity.bid == "run") {
    		return "button-flat-highlight";
    	}
    	else {
    		return "button-flat";
    	}
    };

  });
