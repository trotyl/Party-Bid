function Register(name_of_member, phone_of_member) {
	this.name = name_of_member;
	this.phone = phone_of_member;
	this.activity = Activity.get_current_item().name;
}

//实例方法

Register.prototype.save = function () {
    Data.add(Data.read_list("bid_list"), this, "register_list");
};

//内调方法



//外调方法

Register.read_members_of_activity = function (activity_to_search) {
	var register_list = Data.read_list("register_list");
	return _.where(register_list, {activity: activity_to_search.name});
};

Register.find_name_by_phone = function(phone_to_search) {
	return Data.check_if_contains(Data.read_list("register_list"), {phone: phone_to_search}).name;
};

Register.check_if_repeat = function (phone_to_check) {
    var object_to_check = {activity: Data.read_list("activity_list").name, phone: phone_to_check};
    return Data.check_if_contains(Data.read_list("register_list"), object_to_check);
};
