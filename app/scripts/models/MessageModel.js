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

Message.cope_new_register = function (name_of_member, phone_of_message) {
	var status_of_register = Activity.get_current_item().register || "prepare";
	if(status_of_register == "run") {
		if(!Register.check_if_repeat(phone_of_message)) {
			Register.add_new_item(new Register(name_of_member, phone_of_message));
		}
		else {status_of_register = "run_but_repeat";}
	}	
	Message.sendback_info(phone_of_message, "register", status_of_register);
};

Message.get_price_of_bid = function (text_of_message) {
	return text_of_message.substring(2).replace(' ', '');
};

Message.check_bad_request = function (status_of_bid, phone_of_message) {
	if(status_of_bid != "run") {
		return status_of_bid;
	}
	if(!Bid.check_if_register(phone_of_message)) {
		return "undefined";
	}
	if(Bid.check_if_repeat(phone_of_message)) {
		return "run_but_repeat";
	}
	return false;
};

Message.cope_new_bid = function (price_of_bid, phone_of_message) {
	var status_of_bid = Activity.get_current_item().bid || "prepare";
	var bad_status = "";
	if(bad_status = Message.check_bad_request(Message.check_bad_request)) {
		Message.sendback_info(phone_of_message, "bid", bad_status);
		return 0;
	}
	var new_bid = new Bid(price_of_bid, phone_of_message);
	new_bid.save();
	Bid.refresh_ui_list();
};

Message.sendback_info = function (phone, type, status) {
	var text;
	if (type == "register") {
		switch(status) {
			case "run": text = "恭喜！报名成功！^o^"; break;
			case "prepare": text = "活动尚未开始，请稍后~ >.<"; break;
			case "over": text = "Sorry，活动报名已结束.. =.="; break;
			default: text = "您已经报过名了，请勿浪费短信费.. -_-||";
		}
	}
	if (type == "bid") {
		switch(status) {
			case "run": text = "恭喜！您已出价成功！^o^"; break;
			case "prepare": text = "竞价尚未开始，请稍后~ >.<"; break;
			case "over": text = "Sorry，活动竞价已结束.. =.="; break;
			case "undefined": text = "对不起，您没有报名此次活动.. T.T"; break;
			default: text = "您已成功出价，请勿重复出价.. -_-||";
		}
	}
	native_accessor.send_sms(phone, text);
};
