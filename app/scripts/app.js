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

function Url() {
}

Url.get_home = function () {
  return '/';
};

Url.get_create = function () {
  return '/create';
};

Url.get_activity = function (the_activity) {
  return '/detail/' + the_activity.name;
};

Url.get_activity_bids = function (the_activity) {
  return '/detail/' + the_activity.name + '/bid';
};

Url.get_bid = function (the_activity, the_bid_number) {
  return '/detail/' + the_activity.name + '/bid/' + the_bid_number;
};

var native_access;
$(document).ready(function () {
    localStorage.signing_up = '';

    native_access = new NativeAccess();

});