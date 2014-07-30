function Register(name_of_member, phone_of_member) {
	this.name = name_of_member;
	this.phone = phone_of_member;
	this.activity = current_activity.name;
}

Register.get_all_items = function () {
	return JSON.parse(localStorage.getItem("register_list")) || [];
};

Register.save_all_items = function (register_list) {
	return localStorage.setItem("register_list", JSON.stringify(register_list));
};

Register.add_new_item = function (new_register) {
	var register_list = Register.get_all_items();
	register_list.push(new_register);
	Register.save_all_items(register_list);
}

Register.read_members_of_activity = function (activity_to_search) {
	var register_list = Register.get_all_items();
	return _.where(register_list, {activity: activity_to_search.name});
};

Register.find_member_name_by_phone = function(phone_to_search) {
	var register_list = Register.get_all_items();
	return _(register_list).findWhere({phone: phone_to_search}).name;
};

Register.cope_new_message = function (text_of_message, phone_of_message) {
    var name_of_member = text_of_message.substring(2).replace(' ', '');
	var status_of_register = Activity.get_current_item().register || "prepare";
	if(status_of_register != "run") {
		Message.sendback_info(phone_of_message, "register", status_of_register);
	}
	else {
		if(!Register.check_if_repeat(phone_of_message)) {
			var new_register = new Register(name_of_member, phone_of_message);
			Register.add_new_item(new_register);
			Register.refresh_ui_list();
			Message.sendback_info(phone_of_message, "register", "run");
		}
		else {
			Message.sendback_info(phone_of_message, "register", "run_but_repeat");
		}
	}	
};

Register.check_if_repeat = function (phone_to_check) {
	var register_list = Register.get_all_items();
    var name_of_activity = current_activity.name;
    return !!(_(register_list).findWhere({phone: phone_to_check, activity: name_of_activity}));
};

Register.refresh_ui_list = function () {
	var detail_scope = angular.element("#register").scope();
	if(typeof(detail_scope.update_when_receive) == "function")  {
		detail_scope.$apply(function () {
			detail_scope.update_when_receive();
		});
	}
};
