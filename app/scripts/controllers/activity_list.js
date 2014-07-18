'use strict';

/**
 * @ngdoc function
 * @name partyBidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the partyBidApp
 */
angular.module('partyBidApp')
  .controller('MainCtrl', function ($scope, $location) {
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

    $scope.check_if_null = function(){
    	// temp = localStorage.getItem('num_of_actv');
    	// if(!temp || temp == 0){
    		$location.path('/about')
    	// }
    };
  });
