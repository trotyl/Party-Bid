function Message() {

}

Message.received_new_item = function(message_json) {
  	console.log(message_json);

	var new_message = message_json.messages[0];
	var message_text = new_message.message;
	var message_phone = new_message.phone;
	var header_is_right = message_text.substring(0,2).toUpperCase() == 'BM';
	
	console.log("step_2");

	if(header_is_right) {
		console.log("step_3");

	    var message_name = message_text.substring(2).replace(' ', '');
	    console.log(message_name);

		var activity_status = localStorage.getItem("activity_status") || "prepare";
		console.log(activity_status);

		if(activity_status == "prepare") {
			Message.sendback_info_early(message_phone);
		}
		else if(activity_status == "over") {
			Message.sendback_info_late(message_phone);
		}
		else {
			console.log("step_4");

	    	var local_messages = JSON.parse(localStorage.getItem('message_list')) || [];
	    	console.log(local_messages);
	    	
			if(!Message.check_if_repeat(message_phone, local_messages)) {
				console.log("step_5");


				local_messages.splice(0,0,{name:message_name, phone:message_phone});
				localStorage.setItem('message_list', JSON.stringify(local_messages));
				Message.sendback_info_success(message_phone);
				native_accessor.is_unread = true;
			}
		}	
	}
};

Message.read_new_item = function() {
	var local_messages = JSON.parse(localStorage.getItem('message_list')) || [];
	native_accessor.is_unread = false;
	return local_messages;
};

Message.check_if_repeat = function (phone_to_check, whole_message_list) {
    var repeat = false;
    for (var i = whole_message_list.length - 1; i >= 0; i--) {
        if(whole_message_list[i].phone == phone_to_check) {
            repeat = true;
            break;
        }
    };
    return repeat;
};

Message.sendback_info_success = function(phone) {
	native_accessor.send_sms(phone, "恭喜！报名成功！^o^");
};

Message.sendback_info_early = function(phone) {
	native_accessor.send_sms(phone, "活动尚未开始，请稍后~ >.<");
};

Message.sendback_info_late = function(phone) {
	native_accessor.send_sms(phone, "Sorry，活动报名已结束.. =.=");
};