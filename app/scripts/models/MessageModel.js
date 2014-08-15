function Message() {}

Message.received_new_item = function (message_json) {
	var text = message_json.messages[0].message;
	var phone = message_json.messages[0].phone;
	var header = text.substring(0,2).toUpperCase();
	if(header == "BM") {
		Message.cope_new_register(Message.get_name(text), phone);
		return;
	}
	if(header == "JJ") {
		Message.cope_new_bid(Message.get_price(text), phone);
	}
};

Message.get_name = function (text_of_message) {
	return text_of_message.substring(2).replace(/\s/g, '');
};

Message.get_price = function (text_of_message) {
	return parseInt(text_of_message.substring(2).replace(/\s/g, ''));
};

Message.cope_new_register = function (name, phone) {
	var status = Activity.now().register || "prepare";
	var bad_status = (status != "run");
	if (!bad_status && (bad_status = Register.check_if_repeat(phone))) {
		status = "repeat";
	}
	Message.sendback_info(phone, "register", status);
	if (!bad_status) {
		var new_register = new Register(name, phone);
		new_register.save();
		Data.refresh_ui_list("register");
	};
};

Message.cope_new_bid = function (price, phone) {
	if (price <= 0) { return; }
	var status = Activity.now().bid || "prepare";
	var bad_status = (status != "run");
	if (!bad_status && (bad_status = !Bid.check_if_register(phone))) {
		status = "undefined";
	}
	if (!bad_status && (bad_status = Bid.check_if_repeat(phone))) {
		status = "repeat";
	}
	Message.sendback_info(phone, "bid", status);
	if (!bad_status) {
		var new_bid = new Bid(price, phone, Activity.now().name, Activity.now().count);
		new_bid.save();
		Data.refresh_ui_list("bid");		
	};
};

Message.sendback_info = function (phone, type, status) {
	var message_back = {
		"register_run": "恭喜！报名成功！^o^",
		"register_prepare": "活动尚未开始，请稍后~ >.<",
		"register_over": "Sorry，活动报名已结束.. =.=",
		"register_repeat": "您已经报过名了，请勿浪费短信费.. -_-||",
		"bid_run": "恭喜！您已出价成功！^o^",
		"bid_prepare": "竞价尚未开始，请稍后~ >.<",
		"bid_over": "Sorry，活动竞价已结束.. =.=",
		"bid_undefined": "对不起，您没有报名此次活动.. T.T",
		"bid_repeat": "您已成功出价，请勿重复出价.. -_-||"
	}
	var text = message_back[type + '_' + status];
	Data.get_native_accessor().send_sms(phone, text);
};
