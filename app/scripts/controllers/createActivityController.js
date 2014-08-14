'use strict';

function CreateActivityController ($scope, $location) {

    $scope.initiate_data = function () {
        $scope.show_warning = false;
        $scope.show_back = Activity.exist();
    };

    $scope.create_activity = function (name) {
        if(Activity.check_if_repeat(name)) {
            $scope.show_warning = true;
            return;
        }
        var new_activity = new Activity(name);
        new_activity.save();
        $location.path(Url.activity_detail(new_activity.name));
    };

    $scope.inputting = function () {
        $scope.show_warning = false;
    };

    $scope.initiate_data();

  };
