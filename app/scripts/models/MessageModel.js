function Message() {
}

Message.received_new_item = function (message_json) {
	var message_text = message_json.messages[0].message;
	var message_phone = message_json.messages[0].phone;
	var message_header = message_text.substring(0,2).toUpperCase();
	if(message_header == "BM") {
		Message.cope_new_register(Message.get_name_of_register(message_text), message_phone);
		return 0;
	}
	if(message_header == "JJ") {
		Message.cope_new_bid(Message.get_price_of_bid(message_text), message_phone);
		return 0;
	}
};

Message.get_name_of_register = function (text_of_message) {
	return text_of_message.substring(2).replace(' ', '');
};

Message.get_price_of_bid = function (text_of_message) {
	return Message.get_name_of_register(text_of_message);
};

Message.cope_new_register = function (name_of_member, phone_of_message) {
	var status_of_register = Activity.now().register || "prepare";
	var right_status = (status_of_register == "run");
	if (Register.check_if_repeat(phone_of_message)) {
		status_of_register = "repeat";
		right_status = false;
	}
	Message.sendback_info(phone_of_message, "register", status_of_register);
	if (right_status) {
		var new_register = new Register(name_of_member, phone_of_message);
		new_register.save();
		Data.refresh_ui_list("register");
	};
};

Message.cope_new_bid = function (price_of_bid, phone_of_message) {
	var status_of_bid = Activity.now().bid || "prepare";
	var right_status = (status_of_bid == "run");
	if (!Bid.check_if_register(phone_of_message)) {
		status_of_bid = "undefined";
		right_status = false;
	}
	if (Bid.check_if_repeat(phone_of_message)) {
		status_of_bid = "repeat";
		right_status = false;
	}
	Message.sendback_info(phone_of_message, "bid", status_of_bid);
	if (right_status) {
		var current_activity = Activity.now();
		var new_bid = new Bid(price_of_bid, phone_of_message, current_activity.name, current_activity.count);
		new_bid.save();
		Data.refresh_ui_list("bid");		
	};
};

Message.sendback_info = function (phone, type, status) {
	var text;
	switch(type + "_" + status) {
		case "register_run": text = "恭喜！报名成功！^o^"; break;
		case "register_prepare": text = "活动尚未开始，请稍后~ >.<"; break;
		case "register_over": text = "Sorry，活动报名已结束.. =.="; break;
		case "register_repeat": text = "您已经报过名了，请勿浪费短信费.. -_-||"; break;
		case "bid_run": text = "恭喜！您已出价成功！^o^"; break;
		case "bid_prepare": text = "竞价尚未开始，请稍后~ >.<"; break;
		case "bid_over": text = "Sorry，活动竞价已结束.. =.="; break;
		case "bid_undefined": text = "对不起，您没有报名此次活动.. T.T"; break;
		case "bid_repeat": text = "您已成功出价，请勿重复出价.. -_-||"; break;
		default: text = "如果你能收到此消息说明程序有问题！！！"; break;
	}
	native_accessor.send_sms(phone, text);
};
