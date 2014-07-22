'use strict';

angular.module('partyBidApp')
  .controller('ActivityDetailController', function ($scope, $location, $routeParams) {

  	$scope.status_to_watch;

  	$scope.initiate_data = function () {
  		$scope.activity_name = $routeParams.name;
  		$scope.start_or_stop = Activity.is_running($scope.activity_name)? "结束": "开始";
  		$scope.status_to_watch = $scope.start_or_stop;

  		if($scope.start_or_stop == "开始") {
  			if(Activity.one_in_progress()) {
  				console.log("check_1");
  				$scope.can_not_start = true;
  			}
  		}
  	};

  	$scope.initiate_data();

    $scope.back_to_home = function () {
    	$location.path('/');
    };

    $scope.alter_activity_status = function () {
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

    $scope.update_when_receive = function () {
        console.log("success");

        $scope.message_list = Message.read_all_items($scope.activity_name);
        if($scope.message_list.length != 0) {
        	//$scope.member_count = "(" ＋ /*$scope.message_list.length.toString() ＋*/ ")人";
        	$scope.member_count = "(".concat($scope.message_list.length.toString()).concat("人)");
        }
        else {
        	$scope.member_count = "";
        }
    };

    $scope.update_when_receive();
    // $scope.$watch(native_accessor, check_if_receive, true);
  });
