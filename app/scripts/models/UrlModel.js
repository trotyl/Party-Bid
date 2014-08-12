function Url() {
}

Url.home = function () {
  return '/';
};

Url.create_activity = function () {
  return '/create';
};

Url.activity_detail = function (the_activity) {
  return '/detail/' + the_activity.name;
};

Url.bid_list = function (name) {
  return '/detail/' + name + '/bid';
};

Url.bid_detail = function (the_activity, the_bid_number) {
  return '/detail/' + the_activity.name + '/bid/' + the_bid_number;
};

Url.bid_result = function (the_activity, the_bid_number, is_new_access) {
	return '/detail/' + the_activity.name + '/bid/' + the_bid_number + '/result/' + is_new_access;
};

Url.bid_stats = function (the_activity, the_bid_number) {
  return '/detail/' + the_activity.name + '/bid/' + the_bid_number + '/stats';
};

angular.module('partyBidApp')
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
      .when('/detail/:name/bid/:number/result/:new?', {
        templateUrl: 'views/bid_result.html',
        controller: 'BidResultController'
      })
      .when('/detail/:name/bid/:number/stats', {
        templateUrl: 'views/bid_stats.html',
        controller: 'BidStatsController'
      })
      .otherwise({
        redirectTo: '/'
      });
    });
