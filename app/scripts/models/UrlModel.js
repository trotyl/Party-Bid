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