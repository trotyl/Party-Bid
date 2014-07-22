function Message() {
}

Message.get_all_items = function () {
	return JSON.parse(localStorage.getItem('message_list')) || [];
};

Message.save_all_items = function (message_list) {
	return localStorage.setItem('message_list', JSON.stringify(message_list));
};

Message.received_new_item = function(message_json) {
	var message_text = message_json.messages[0].message;
	var message_phone = message_json.messages[0].phone;
	var header_is_right = message_text.substring(0,2).toUpperCase() == 'BM';

	if(header_is_right) {
	    var message_name = message_text.substring(2).replace(' ', '');
		var activity_status = localStorage.getItem("activity_status") || "prepare";
		if(activity_status == "prepare") {
			Message.sendback_info(message_phone, "early");
		}
		else if(activity_status == "over") {
			Message.sendback_info(message_phone, "late");
		}
		else {
	    	var message_list = Message.get_all_items();
			if(!Message.check_if_repeat(message_phone)) {
				var activity_name = Activity.get_current_item();
				message_list.splice(0,0,{name:message_name, phone:message_phone, activity:activity_name});
				Message.save_all_items(message_list);
				Message.refresh_ui_list();
				Message.sendback_info(message_phone, "success");
			}
		}	
	}
};

Message.refresh_ui_list = function () {
	var detail_scope = angular.element("#detail_scope").scope();
	if(detail_scope) {
		detail_scope.$apply(function () {
			detail_scope.update_when_receive();
		});
	}
};

Message.read_all_items = function(activity_name) {
	var message_list = Message.get_all_items();
	return _.where(message_list, {activity: activity_name});
};

Message.check_if_repeat = function (phone_to_check) {
	var message_list = Message.get_all_items();
    var activity_name = Activity.get_current_item();
    return !!(_.findWhere(message_list, {phone: phone_to_check, activity: activity_name}));
};

Message.sendback_info = function(phone, status) {
	var text = "";
	if(status == "success") {
		text = "恭喜！报名成功！^o^";
	}
	else if(status == "early") {
		text = "活动尚未开始，请稍后~ >.<";
	}
	else {
		text = "Sorry，活动报名已结束.. =.=";
	}
	native_accessor.send_sms(phone, text);
};
