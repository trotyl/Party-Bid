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
	return text_of_message.substring(2).replace(' ', '');
};

Message.get_price = function (text_of_message) {
	return parseInt(text_of_message.substring(2).replace(' ', ''));
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
	var text = dictionary[type + '_' + status];
	native_accessor.send_sms(phone, text);
};
