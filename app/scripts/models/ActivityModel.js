function Activity(name, createdAt, register, bid, count) {
    this.name = name;
    this.createdAt = createdAt;
    this.register = register;
    this.bid = bid;
    this.count = count;
}

//实例方法

Activity.prototype.save = function () {
    Data.add(Data.read("activity_list"), this, "activity_list");
};

Activity.prototype.start_register = function () {
    Activity.alter_status(this.name, "register", "run");
};

Activity.prototype.stop_register = function () {
    Activity.alter_status(this.name, "register", "over");
};

Activity.prototype.start_bid = function () {
    Activity.alter_status(this.name, "bid", "run");
};

Activity.prototype.stop_bid = function () {
    Activity.alter_status(this.name, "bid", "over");
};

//内调方法（可外调）

Activity.update_current_activity = function (activity_to_update) {
    localStorage.setItem("current_activity", activity_to_update.name);
};

Activity.alter_status = function (name_of_activity, type_to_alter, status_to_alter) {
    var activity_list = Data.read("activity_list");
    var activity_found = Data.find_if_in(activity_list, {name: name_of_activity});
    type_to_alter == "register"? activity_found.register = status_to_alter: activity_found.bid = status_to_alter;
    type_to_alter == "bid" && status_to_alter == "run"? activity_found.count += 1 : false;
    Data.save(activity_list, "activity_list");
    Activity.update_current_activity(activity_found);  
};

//外调方法

Activity.get_current_item = function () {
    var current_activity = localStorage.getItem("current_activity") || "";
    return Data.find_if_in(Data.read("activity_list"),{name: current_activity});
};

Activity.check_ifnot_null = function () {
    return !_.isEmpty(Data.read("activity_list"));
};

Activity.check_if_repeat = function (activity_name_to_check) {
    return Data.find_if_in(Data.read("activity_list"), {name: activity_name_to_check});
};

Activity.check_if_one_on_progress = function () {
    return _(Data.read("activity_list")).some(function (activity_on_iterator) { 
        return activity_on_iterator.register == "run" || activity_on_iterator.bid == "run";});
};

Activity.find_by_name = function (name_to_find) {
    var object_found = _(Data.read("activity_list")).findWhere({name: name_to_find});
    return new Activity(object_found.name, object_found.createdAt, object_found.register, object_found.bid, object_found.count);
};