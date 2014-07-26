function Bid() {
}

Bid.get_all_items = function () {
	return JSON.parse(localStorage.getItem("bid_list")) || [];
};

Bid.save_all_items = function (bid_list) {
	return localStorage.setItem("bid_list", JSON.stringify(bid_list));
};

Bid.add_new_item = function (bid_price, member_phone) {
	var bid_list = Bid.get_all_items();
	var activity_name = Activity.get_current_item().name;
	var bid_number = Activity.get_current_item().number;
	bid_list.push({activity:activity_name, number:bid_number, phone:member_phone, price:bid_price});
	Bid.save_all_items(bid_list);
};

Bid.read_activity_bids = function (activity_name) {
	var bid_list = Bid.get_all_items();
	return _.where(bid_list, {activity: activity_name});
};

Bid.read_bid_members = function (activity_name, bid_number) {
	var bid_list = Bid.get_all_items();
	return _.where(bid_list, {activity: activity_name, number: bid_number});
};

Bid.cope_new_message = function (message_text, message_phone) {
    var member_name = message_text.substring(2).replace(' ', '');
	var bid_status = Activity.get_current_item().bid || "null";
	if(bid_status != "run") {
		Message.sendback_info(message_phone, "bid", bid_status);
	}
	else {
		if(Bid.check_if_register(message_phone)) {
			if(!Bid.check_if_repeat(message_phone)) {
				Bid.add_new_item(bid_price, message_phone);
				Bid.refresh_ui_list();
				Message.sendback_info(message_phone, "bid", "run");
			}
			else {
				Message.sendback_info(message_phone, "bid", "run_but_repeat");
			}
		}
		else {
			Message.sendback_info(message_phone, "bid", "undefined");
		}
	}	
};

Bid.check_if_register = function (phone_to_check) {
	return Register.check_if_repeat(phone_to_check);
};

Bid.check_if_repeat = function (phone_to_check) {
	var bid_list = Bid.get_all_items();
    var activity_name = Activity.get_current_item().name;
    var bid_number = Activity.get_current_item().number;
    return !!(_.findWhere(member_list, {activity: activity_name, number: bid_number, phone:phone_to_check}));
};