'use strict';

angular.module('partyBidApp')
  .controller('CreateActivityController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.show_warning = false;
        $scope.show_back = Activity.exist();
    };

    $scope.go_home = function () {
        $location.path(Url.home());
    };

    $scope.create_activity = function () {
        if(Activity.check_if_repeat($scope.name_to_create)) {
            $scope.is_warning_show = true;
            return;
        }
        var new_activity = new Activity($scope.name_to_create, Date.parse(new Date()), "prepare", "prepare", 0);
        new_activity.save();
        $location.path(Url.activity_detail(new_activity));
    };

    // function check_if_empty(newValue, oldValue, scope) {
    //     $scope.is_warning_show = false;
    //     $scope.is_name_empty = !$scope.name_to_create;
    // };

    $scope.initiate_data();

    // $scope.$watch('name_to_create', check_if_empty, true);

  });
