function Bid(bid_price, member_phone) {
	this.activity = current_activity.name;
	this.number = current_activity.count;
	this.phone = member_phone;
	this.price = bid_price;
	this.name = Register.find_member_name_by_phone(member_phone);
	this.compute_index();
}

Bid.get_all_items = function () {
	return JSON.parse(localStorage.getItem("bid_list")) || [];
};

var bid_list = Bid.get_all_items();

Bid.save_all_items = function () {
	return localStorage.setItem("bid_list", JSON.stringify(bid_list));
};

Bid.add_new_item = function (new_bid) {
	bid_list.push(new_bid);
	Bid.save_all_items(bid_list);
};

Bid.read_activity_bids = function (the_activity) {
	var result = [];
	for (var i = 0; i < the_activity.count; i++) {
		result.push({name:"竞价 ".concat(i + 1)});
	};
	return result;
};

Bid.prototype.compute_index = function () {
	this.index = _(bid_list).findWhere({activity:this.activity, number:this.number}).length + 1;
}

Bid.read_bid_records = function (the_activity, bid_number) {
	return _(bid_list).where({activity: the_activity.name, number: bid_number});
};

Bid.cope_new_message = function (message_text, message_phone) {
    var bid_price = message_text.substring(2).replace(' ', '');
	var bid_status = current_activity.bid || "null";
	if(bid_status != "run") {
		Message.sendback_info(message_phone, "bid", bid_status);
	}
	else {
		if(Bid.check_if_register(message_phone)) {
			if(!Bid.check_if_repeat(message_phone)) {
				var new_bid = new Bid(bid_price, message_phone)
				Bid.add_new_item(new_bid);
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
    var activity_name = current_activity.name;
    var bid_number = current_activity.number;
    return !!(_.findWhere(bid_list, {activity: activity_name, number: bid_number, phone:phone_to_check}));
};

Bid.refresh_ui_list = function () {
	//写竞价页面的时候再来写
};