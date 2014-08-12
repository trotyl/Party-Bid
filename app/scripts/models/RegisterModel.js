function Register(name, phone) {
	this.name = name;
	this.phone = phone;
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
Register.read_members_of_activity = function (the_activity) {
	return _.where(Register.all(), {activity: the_activity.name}) || [];
};

Register.find_name_by_phone = function(phone) {
	var result = _(Register.all()).findWhere({phone: phone}) || {};
	return result.name;
};

Register.check_if_repeat = function (phone) {
    return _(Register.all()).findWhere({activity: Activity.now().name, phone: phone});
};
