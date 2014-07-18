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

    $scope.activities = [
    	{name:'Activity 1', created_at:'201407171523', status:0},
    	{name:'Activity 2', created_at:'201407171521', status:0},
    	{name:'Activity 3', created_at:'201407171525', status:0},
    	{name:'Activity 4', created_at:'201407171520', status:0}
    ];
    $scope.if_empty = "true";
    $scope.ifnot_empty = "false";
    $scope.check_if_empty = function() {
      value = $scope.inputActvName;
      if(value){
        $scope.if_empty = "false";
        $scope.ifnot_empty = "true";
      }
      else{
        $scope.if_empty = "true";
        $scope.ifnot_empty = "false";
      }
    }
  });
