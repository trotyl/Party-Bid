function Bid(price_of_bid, phone_of_member, name_of_activity, number_of_bid) {
	this.activity = name_of_activity;
	this.number = number_of_bid;
	this.phone = phone_of_member;
	this.price = price_of_bid;
	this.find_name();
	this.compute_index();
}

//实例方法

Bid.prototype.save = function () {
	var bid_list = Bid.get_all_items();
	bid_list.push(this);
	Bid.save_all(bid_list);
};

Bid.prototype.compute_index = function () {
	var bid_list = Bid.get_all_items();
	this.index = (_(bid_list).where({activity:this.activity, number:this.number}) || []).length + 1;
};

Bid.prototype.find_name = function () {
	this.name = Register.find_member_name_by_phone(this.phone);
};

//内调方法

Bid.get_all_items = function () {
	return JSON.parse(localStorage.getItem("bid_list")) || [];
};

Bid.save_all = function (bid_list) {
	return localStorage.setItem("bid_list", JSON.stringify(bid_list));
};

Bid.get_grouped_list = function (activity_to_search, number_of_bid) {
	var record_list = Bid.read_records_of_bid(activity_to_search, number_of_bid);
	return _(record_list).groupBy(function (bid) { return bid.price; });
};

//外调方法

Bid.read_bids_of_activity = function (activity_to_search) {
	var result = [];
	for (var i = 0; i < activity_to_search.count; i++) {
		result.push({name:"竞价 ".concat(i + 1)});
	};
	return result;
};

Bid.read_records_of_bid = function (activity_to_search, number_of_bid) {
	var bid_list = Bid.get_all_items();
	return _(bid_list).where({activity: activity_to_search.name, number: number_of_bid});
};

Bid.read_stats_of_bid = function (activity_to_search, number_of_bid) {
	var grouped_list = Bid.get_grouped_list(activity_to_search, number_of_bid);
	var pairs_list = _.pairs(grouped_list);
	return _(pairs_list).map(function (pair) { return {price: pair[0], count: pair[1].length}; });
};

Bid.compute_result = function (activity_to_search, number_of_bid) {
	var grouped_list = Bid.get_grouped_list(activity_to_search, number_of_bid);
	var result_list = _(grouped_list).find(function (value) { return value.length == 1; }) || [{warn: "竞价失败！"}]
	return result_list[0];
};

Bid.check_if_register = function (phone_to_check) {
	return Register.check_if_repeat(phone_to_check);
};

Bid.check_if_repeat = function (phone_to_check) {
	var bid_list = Bid.get_all_items();
    var activity_name = Activity.get_current_item().name;
    var bid_number = Activity.get_current_item().count;
    return !!(_(bid_list).findWhere({activity: activity_name, number: bid_number, phone:phone_to_check}));
};
