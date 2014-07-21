'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location, $routeParams) {

  	$scope.status_to_watch;

  	$scope.initiate_data = function () {
  		$scope.activity_name = $routeParams.name;
  		$scope.start_or_stop = Activity.is_running($scope.activity_name)? "结束": "开始";
  		$scope.status_to_watch = $scope.start_or_stop;
  	};

  	$scope.initiate_data();

    $scope.back_to_home = function () {
    	$location.path('/');
    };

    $scope.start_activity = function () {
		if ($scope.start_or_stop == "开始") {
			$scope.status_to_watch = "结束";
	    	Activity.start_activity($scope.activity_name);
		}
    	else {
    		if (window.confirm("确认要结束本次报名吗？！")) {
    			$scope.status_to_watch = "开始";
    			Activity.stop_activity($scope.activity_name);
    		}
    	}
    }

    function check_if_alter(newValue, oldValue, scope) {
        $scope.start_or_stop = $scope.status_to_watch;
    };

    $scope.$watch('status_to_watch', check_if_alter, true);

  });
