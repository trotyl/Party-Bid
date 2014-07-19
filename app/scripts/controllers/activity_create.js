'use strict';

/**
 * @ngdoc function
 * @name partyBidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partyBidApp
 */
angular.module('partyBidApp')
  .controller('ActvCreateCtrl', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Trotyl'
    ];

    $scope.back_to_home = function() {
      $location.path('/');
    }

    $scope.actv_succ = function() {
      var is_repeat = Activity.check_if_repeat($scope.input_actv_name);
      if(is_repeat) {
        $scope.warn_info = "名称与已有活动重复！";
      }
      else {
        //window.alert('hihi');
        Activity.add_new_item($scope.input_actv_name);
        // localStorage.setItem('actvNew', 'true');
        // localStorage.setItem('actvName', $scope.inputActvName);
        $location.path('/register');
      }
    };

    $scope.check_actv_null = function () {
      var actv_not_null = Activity.check_if_null();
      $scope.back_show = actv_not_null;
    }

    $scope.check_actv_null();

    function check_if_empty(newValue, oldValue, scope) {
      //window.alert($scope.inputActvName);
      
      if($scope.input_actv_name){
        $scope.btn_disb = false;
        $scope.warnInfo = $scope.input_actv_name;
      }
      else{
        $scope.btn_disb = true;
        $scope.warnInfo = ' ';
      }
    }
    $scope.$watch('input_actv_name', check_if_empty, true);
  });
