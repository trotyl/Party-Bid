'use strict';

angular.module('partyBidApp')
  .controller('ActivityListController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.activity_list = Activity.get_activities_refer();
        if($scope.activity_list.length == 0){
            $location.path(Url.get_create());
        }
        if(Activity.get_status_refer().bid == "run") {
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
