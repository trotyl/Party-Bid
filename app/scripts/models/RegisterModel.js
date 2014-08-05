function Register(name_of_member, phone_of_member) {
	this.name = name_of_member;
	this.phone = phone_of_member;
	this.activity = Activity.get_current_item().name;
}

Register.prototype.save = function () {
    Data.add(Register.get_all_items(), this, "register_list");
};

Register.get_all_items = function () {
	return JSON.parse(localStorage.getItem("register_list")) || [];
};

Register.read_members_of_activity = function (activity_to_search) {
	var register_list = Register.get_all_items();
	return _.where(register_list, {activity: activity_to_search.name});
};

Register.find_name_by_phone = function(phone_to_search) {
	var register_list = Register.get_all_items();
	return _(register_list).findWhere({phone: phone_to_search}).name;
};

Register.check_if_repeat = function (phone_to_check) {
	var register_list = Register.get_all_items();
    var object_to_check = {activity: Activity.get_current_item().name, phone: phone_to_check};
    return Data.check_if_contains(register_list, object_to_check);
};
