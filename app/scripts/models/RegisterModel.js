function Register(name_of_member, phone_of_member) {
	this.name = name_of_member;
	this.phone = phone_of_member;
	this.activity = Activity.get_current_item().name;
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
	Register.refresh_ui_list();
}

Register.read_members_of_activity = function (activity_to_search) {
	var register_list = Register.get_all_items();
	return _.where(register_list, {activity: activity_to_search.name});
};

Register.find_member_name_by_phone = function(phone_to_search) {
	var register_list = Register.get_all_items();
	return _(register_list).findWhere({phone: phone_to_search}).name;
};

Register.get_name_of_message = function (text_of_message) {
	return text_of_message.substring(2).replace(' ', '');
};

Register.cope_new_message = function (name_of_member, phone_of_message) {
	var status_of_register = Activity.get_current_item().register || "prepare";
	if(status_of_register == "run") {
		if(!Register.check_if_repeat(phone_of_message)) {
			Register.add_new_item(new Register(name_of_member, phone_of_message));
		}
		else {
			status_of_register = "run_but_repeat";
		}
	}	
	Message.sendback_info(phone_of_message, "register", status_of_register);
};

Register.check_if_repeat = function (phone_to_check) {
	var register_list = Register.get_all_items();
    var name_of_activity = Activity.get_current_item().name;
    return !!(_(register_list).findWhere({phone: phone_to_check, activity: name_of_activity}));
};

Register.refresh_ui_list = function () {
	var register_ui_scope = angular.element("#register").scope();
	if(typeof(register_ui_scope.update_when_receive) == "function")  {
		register_ui_scope.$apply(function () {
			register_ui_scope.update_when_receive();
		});
	}
};
