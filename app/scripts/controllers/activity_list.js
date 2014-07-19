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

    //$scope.activities = $localStorage.getItem('activities');
    	// {name:'Activity 1', createdAt:'201407171523', status:0},
    	// {name:'Activity 2', createdAt:'201407171521', status:0},
    	// {name:'Activity 3', createdAt:'201407171525', status:0},
    	// {name:'Activity 4', createdAt:'201407171520', status:0}
    //$scope.activities = [];

    $scope.actv_create = function() {
    	$location.path('/create');
    };

    $scope.actv_show = function() {
    	$location.path('/register');
    };

    $scope.init_data = function() {
    	$scope.activities = Activity.get_all_items();
    	$scope.is_new = Activity.if_new_item();
    	$scope.actv_name = Activity.get_item_name();
    }

    $scope.init_data();

    $scope.check_when_load = function() {
    	if($scope.is_new){
    		//window.alert("-1");
    	 	var nowDate = new Date();
    	 	//window.alert("0");
    	 	$scope.activities.splice(0,0,{name:$scope.actv_name, createdAt:nowDate.toString()});
    	 	//window.alert("1");
    	 	Activity.save_all_items($scope.activities);
    	 	//window.alert("2");
    	 }
    	if($scope.activities.length == 0){
    		$location.path('/create');
    	}	
    }

    $scope.check_when_load();

   //  function checkIfNull(newValue, oldValue, scope) {
   //    //window.alert('huhu');
   //    if($scope.actvNew === 'true'){
   //    	//window.alert('hiuhiu');
   //    	localStorage.setItem('actvNew', 'false');
   //    	//window.alert('hiehie');
   //    	if(!$scope.activities){
   //    		var len = localStorage.getItem('actvNum');
   //    		if (len) {
   //        		for (var i = len - 1; i >= 0; i--) {
   //        			$scope.activities.splice(0,0,{name:localStorage.getItem('name' + i), createdAt:localStorage.getItem('time' + i)});
   //     		  	};  			
   //    		}
   //    		else{
   //    			$scope.activities = [];
   //    		}
   //    	}
 		// //$scope.activities = [{name:$scope.actvName, createdAt:'201407181617'}];   
   //    	$scope.activities.splice(0,0,{name:$scope.actvName, createdAt:'201407181617'});
   //    	localStorage.setItem('actvNum', activities.length.toString());
   //    	for (var i = activities.length - 1; i >= 0; i--) {
   //    		localStorage.setItem('name' + i, activities[i].name);
   //    		localStorage.setItem('time' + i, activities[i].createdAt);
   //    	};
   //    	window.alert('hiahia');
   //    }
   //    if(!$scope.activities || $scope.activities.length === 0){
   //    	//window.alert('hehe');
   //      $location.path('/create');
   //    }
   //    else{
   //    	//window.alert('haha');
   //    }
   //  }

    //$scope.$watch('actvNew', checkIfNull);
  });
