function Bid(price, phone, activity, number, name, index) {
	this.price = price;
	this.phone = phone;
	this.activity = activity || Activity.now().name;
	this.number = number || Activity.now().count;
	this.name = name || Register.find_name_by_phone(this.phone);
	this.index = index || this.compute_index();
}

//实例方法
Bid.prototype.save = function () {
    Data.add(Bid.all(), this, "bid_list");
};

Bid.prototype.compute_index = function () {
	return (_(Bid.all()).where({activity:this.activity, number:this.number}) || []).length + 1;
};

//内调方法
Bid.all = function () {
    return JSON.parse(localStorage.getItem("bid_list")) || [];
};

Bid.get_grouped_list = function (the_activity, bid_number) {
	var record_list = Bid.read_records_of_bid(the_activity, bid_number);
	return _(record_list).groupBy(function (bid) { return bid.price; });
};

//外调方法
Bid.read_bids_of_activity = function (activity) {
	var result = [];
	_(activity.count).times(function (n) {
		result.push({name:"竞价 ".concat(n + 1), bid: n == activity.count - 1? activity.bid: ''});
	})
	return result;
};

Bid.read_records_of_bid = function (the_activity, bid_number) {
	return _(Bid.all()).where({activity: the_activity.name, number: bid_number});
};

Bid.read_stats_of_bid = function (the_activity, bid_number) {
	var grouped_list = Bid.get_grouped_list(the_activity, bid_number);
	return _(_.pairs(grouped_list)).map(function (pair) { 
		return {price: pair[0], count: pair[1].length}; 
	});
};

Bid.compute_result = function (the_activity, bid_number) {
	var grouped_list = Bid.get_grouped_list(the_activity, bid_number);
	var result_list = _(grouped_list).find(function (value) { 
		return value.length == 1; 
	}) || [{warn: "竞价失败！"}];
	return result_list[0];
};

Bid.check_if_register = function (phone_to_check) {
	return Register.check_if_repeat(phone_to_check);
};

Bid.check_if_repeat = function (phone_to_check) {
    return _(Bid.all()).findWhere({activity: Activity.now().name, number: Activity.now().count, phone:phone_to_check});
};
