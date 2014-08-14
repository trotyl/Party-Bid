'use strict';

function ActivityListController ($scope, $location, $http) {

    $scope.initiate_data = function () {
        !Activity.exist() && $scope.go_to_create();
        
        $scope.activity_list = Activity.all();
        $scope.no_create = Activity.on_going();
        $http.get('datas/jsons/message_back.json').success(function(data) {
            dictionary = data;
        });
    };

    $scope.go_to_create = function () {
    	$location.path(Url.create_activity());
    };

    $scope.go_to_detail = function (name) {
    	$location.path(Url.activity_detail(name));
    };

    $scope.initiate_data();

  };
