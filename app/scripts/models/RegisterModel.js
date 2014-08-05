function Register(name_of_member, phone_of_member) {
	this.name = name_of_member;
	this.phone = phone_of_member;
	this.activity = Activity.now().name;
}

//实例方法
Register.prototype.save = function () {
    Data.add(Register.all(), this, "register_list");
};

//内调方法
Register.all = function () {
    return JSON.parse(localStorage.getItem("register_list")) || [];
};

//外调方法
Register.read_members_of_activity = function (activity_to_search) {
	return _.where(Register.all(), {activity: activity_to_search.name});
};

Register.find_name_by_phone = function(phone_to_search) {
	return _(Register.all()).findWhere({phone: phone_to_search}).name;
};

Register.check_if_repeat = function (phone_to_check) {
    return _(Register.all()).findWhere({activity: Activity.now().name, phone: phone_to_check});
};
