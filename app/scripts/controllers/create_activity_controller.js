'use strict';

angular.module('partyBidApp')
  .controller('CreateActivityController', function ($scope, $location) {

    $scope.back_to_home = function() {
      $location.path('/');
    };

    $scope.activity_create = function() {
      var is_repeat = Activity.check_if_repeat($scope.input_activity_name);
      if(is_repeat) {
        $scope.warn_info = "名称与已有活动重复！";
      }
      else {
        Activity.add_new_item($scope.input_activity_name);
        $location.path('/detail');
      }
    };

    $scope.check_activity_null = function () {
      var activity_not_null = Activity.check_if_null();
      $scope.back_show = activity_not_null;
    };

    $scope.check_activity_null();

    function check_if_empty(newValue, oldValue, scope) {
      $scope.warn_info = "";
      $scope.name_is_empty = !$scope.input_activity_name;
    };

    $scope.$watch('input_activity_name', check_if_empty, true);
  });