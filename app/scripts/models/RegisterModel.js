function Register(member_name, member_phone) {
	this.name = member_name;
	this.phone = member_phone;
	this.activity = current_activity.name;
}

Register.get_all_items = function () {
	return JSON.parse(localStorage.getItem("register_list")) || [];
};

var register_list = Register.get_all_items();

Register.save_all_items = function () {
	return localStorage.setItem("register_list", JSON.stringify(register_list));
};

Register.add_new_item = function (new_register) {
	// var activity_name = Activity.get_current_item().name;
	register_list.push(new_register);
	Register.save_all_items(register_list);
}

Register.read_activity_members = function (activity_name) {
	// var register_list = Register.get_all_items();
	return _.where(register_list, {activity: activity_name});
};

Register.cope_new_message = function (message_text, message_phone) {
    var member_name = message_text.substring(2).replace(' ', '');
	var register_status = current_activity.register || "prepare";
	if(register_status != "run") {
		Message.sendback_info(message_phone, "register", register_status);
	}
	else {
		if(!Register.check_if_repeat(message_phone)) {
			var new_register = new Register(member_name, message_phone);
			Register.add_new_item(new_register);
			Register.refresh_ui_list();
			Message.sendback_info(message_phone, "register", "run");
		}
		else {
			Message.sendback_info(message_phone, "register", "run_but_repeat");
		}
	}	
};

Register.check_if_repeat = function (phone_to_check) {
	// var register_list = Register.get_all_items();
    var activity_name = current_activity.name;
    return !!(_.findWhere(register_list, {phone: phone_to_check, activity: activity_name}));
};

Register.refresh_ui_list = function () {
	var detail_scope = angular.element("#register").scope();
	if(detail_scope) {
		detail_scope.$apply(function () {
			detail_scope.update_when_receive();
		});
	}
};
