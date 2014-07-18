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
    	{name:'Activity 1', createdAt:'201407171523', status:0},
    	{name:'Activity 2', createdAt:'201407171521', status:0},
    	{name:'Activity 3', createdAt:'201407171525', status:0},
    	{name:'Activity 4', createdAt:'201407171520', status:0}
    ];

  });
