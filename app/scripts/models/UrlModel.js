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
