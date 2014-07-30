'use strict';

angular
  .module('partyBidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/activity_list.html',
        controller: 'ActivityListController'
      })
      .when('/create', {
        templateUrl: 'views/create_activity.html',
        controller: 'CreateActivityController'
      })
      .when('/detail/:name', {
        templateUrl: 'views/activity_detail.html',
        controller: 'ActivityDetailController'
      })
      .when('/detail/:name/bid', {
        templateUrl: 'views/bid_list.html',
        controller: 'BidListController'
      })
      .when('/detail/:name/bid/:number', {
        templateUrl: 'views/bid_detail.html',
        controller: 'BidDetailController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


var native_access;
$(document).ready(function () {
    localStorage.signing_up = '';

    native_access = new NativeAccess();

});