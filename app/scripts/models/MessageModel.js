function Message() {
}

Message.received_new_item = function (message_json) {
	var message_text = message_json.messages[0].message;
	var message_phone = message_json.messages[0].phone;
	var message_header = message_text.substring(0,2).toUpperCase();
	if(message_header == "BM") {
		Register.cope_new_message(Register.get_name_of_message(message_text), message_phone);
	}
	else if(message_header == "JJ") {
		Bid.cope_new_message(Bid.get_price_of_message(message_text), message_phone);
	}
	else {
		//目前应该没有对其他短信的返回提示要求
	}
};

Message.sendback_info = function (phone, type, status) {
	var text;
	if (type == "register") {
		switch(status) {
			case "run": 
				text = "恭喜！报名成功！^o^";
				break;
			case "prepare":
				text = "活动尚未开始，请稍后~ >.<";
				break;
			case "over": 
				text = "Sorry，活动报名已结束.. =.=";
				break;
			default:
				text = "您已经报过名了，请勿浪费短信费.. -_-||";
		}
	}
	else {
		switch(status) {
			case "run": 
				text = "恭喜！您已出价成功！^o^";
				break;
			case "prepare":
				text = "活动尚未开始，请稍后~ >.<";
				break;
			case "over": 
				text = "Sorry，活动报名已结束.. =.=";
				break;
			case "undefined":
				text = "对不起，您没有报名此次活动.. T.T"
				break;
			default:
				text = "您已成功出价，请勿重复出价.. -_-||";
		}
	}
	if(text) {
		native_accessor.send_sms(phone, text);
	}
};
