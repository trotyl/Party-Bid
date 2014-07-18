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

    $scope.actvCreated = function() {
      //window.alert('hihi');
      localStorage.setItem('actvNew', 'true');
      localStorage.setItem('actvName', $scope.inputActvName);
      $location.path('/');
    };

    function checkIfEmpty(newValue, oldValue, scope) {
      //window.alert($scope.inputActvName);
      
      if($scope.inputActvName){
        $scope.ifEmpty = 'false';
        $scope.ifNotEmpty = 'true';
        $scope.warnInfo = $scope.inputActvName;
      }
      else{
        $scope.ifEmpty = 'true';
        $scope.ifNotEmpty = 'false';
        $scope.warnInfo = ' ';
      }
    }
    $scope.$watch('inputActvName', checkIfEmpty, true);
  });
