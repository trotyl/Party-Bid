function Url() {
}

Url.go_to_home_page = function () {
  return '/';
};

Url.go_to_create_activity_page = function () {
  return '/create';
};

Url.go_to_activity_detail_page = function (the_activity) {
  return '/detail/' + the_activity.name;
};

Url.go_to_bid_list_page = function (the_activity) {
  return '/detail/' + the_activity.name + '/bid';
};

Url.go_to_bid_detail_page = function (the_activity, the_bid_number) {
  return '/detail/' + the_activity.name + '/bid/' + the_bid_number;
};

Url.go_to_bid_result_page = function (the_activity, the_bid_number) {
  return '/detail/' + the_activity.name + '/bid/' + the_bid_number + '/result';
};

Url.go_to_bid_stats_page = function (the_activity, the_bid_number) {
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
      .when('/detail/:name/bid/:number/result', {
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
