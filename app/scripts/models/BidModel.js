function Bid(price_of_bid, phone_of_member) {
	this.activity = current_activity.name;
	this.number = current_activity.count;
	this.phone = phone_of_member;
	this.price = price_of_bid;
	this.name = Register.find_member_name_by_phone(this.phone);
	this.compute_index();
}

Bid.prototype.compute_index = function () {
	this.index = _(bid_list).findWhere({activity:this.activity, number:this.number}).length + 1;
}

Bid.get_all_items = function () {
	return JSON.parse(localStorage.getItem("bid_list")) || [];
};

Bid.save_all_items = function (bid_list) {
	return localStorage.setItem("bid_list", JSON.stringify(bid_list));
};

Bid.add_new_item = function (new_bid) {
	var bid_list = Bid.get_all_items();
	bid_list.push(new_bid);
	Bid.save_all_items(bid_list);
	Bid.refresh_ui_list();			
};

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

Bid.get_price_of_message = function (text_of_message) {
	return text_of_message.substring(2).replace(' ', '');
};

Bid.cope_new_message = function (price_of_bid, phone_of_message) {
	var status_of_bid = Activity.get_current_item().bid || "prepare";
	if(bid_status == "run") {
		if(Bid.check_if_register(phone_of_message)) {
			if(!Bid.check_if_repeat(phone_of_message)) {
				Bid.add_new_item(new Bid(bid_price, phone_of_message));
			}
			else {
				status_of_bid = "run_but_repeat";
			}
		}
		else {
			status_of_bid = "undefined";
		}
	}	
	Message.sendback_info(phone_of_message, "bid", status_of_bid);
};

Bid.check_if_register = function (phone_to_check) {
	return Register.check_if_repeat(phone_to_check);
};

Bid.check_if_repeat = function (phone_to_check) {
	var bid_list = Bid.get_all_items();
    var activity_name = current_activity.name;
    var bid_number = current_activity.number;
    return !!(_.findWhere(bid_list, {activity: activity_name, number: bid_number, phone:phone_to_check}));
};

Bid.refresh_ui_list = function () {
	var bid_ui_scope = angular.element("#bid").scope();
	if(typeof(bid_ui_scope.update_when_receive) == "function")  {
		bid_ui_scope.$apply(function () {
			bid_ui_scope.update_when_receive();
		});
	}
};