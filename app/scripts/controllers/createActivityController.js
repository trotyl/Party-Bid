'use strict';

angular.module('partyBidApp')
  .controller('CreateActivityController', function ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.show_warning = false;
        $scope.show_back = Activity.exist();
    };

    $scope.create_activity = function (name) {
        if(Activity.check_if_repeat(name)) {
            $scope.show_warning = true;
            return;
        }
        var new_activity = new Activity($scope.name_to_create, Date.parse(new Date()), "prepare", "prepare", 0);
        new_activity.save();
        $location.path(Url.activity_detail(new_activity));
    };

    $scope.inputting = function () {
        $scope.show_warning = false;
    };

    $scope.initiate_data();

  });
