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
