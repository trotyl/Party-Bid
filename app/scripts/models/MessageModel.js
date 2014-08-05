function Message() {}

Message.received_new_item = function (message_json) {
	var text = message_json.messages[0].message;
	var phone = message_json.messages[0].phone;
	var header = text.substring(0,2).toUpperCase();
	if(header == "BM") {
		Message.cope_new_register(Message.get_body(text), phone);
		return;
	}
	if(header == "JJ") {
		Message.cope_new_bid(Message.get_body(text), phone);
	}
};

Message.get_body = function (text_of_message) {
	return text_of_message.substring(2).replace(' ', '');
};

Message.cope_new_register = function (name, phone) {
	var status = Activity.now().register || "prepare";
	var bad_status = (status == "run");
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
	var status = Activity.now().bid || "prepare";
	var bad_status = (status == "run");
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
