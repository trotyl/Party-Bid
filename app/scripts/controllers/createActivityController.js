'use strict';

angular.module('partyBidApp')
  .controller('CreateActivityController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.is_warning_show = false;
        $scope.back_show = Activity.check_ifnot_null();
    };

    $scope.back_to_home = function () {
        $location.path(Url.go_to_home_page());
    };

    $scope.activity_create = function () {
        var is_name_repeat = Activity.check_if_repeat($scope.input_activity_name);
        if(is_name_repeat) {
            $scope.is_warning_show = true;
        }
        else {
            var new_activity = new Activity($scope.input_activity_name);
            Activity.add_new_item(new_activity);
            $location.path(Url.go_to_activity_detail_page(new_activity));
        }
    };

    function check_if_empty(newValue, oldValue, scope) {
        $scope.is_warning_show = false;
        $scope.is_name_empty = !$scope.input_activity_name;
    };

    $scope.initiate_data();

    $scope.$watch('input_activity_name', check_if_empty, true);

  });
