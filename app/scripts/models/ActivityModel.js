function Activity(name, createdAt, register, bid, count) {
    this.name = name;
    this.createdAt = createdAt;
    this.register = register;
    this.bid = bid;
    this.count = count;
}

//实例方法

Activity.prototype.save = function () {
    Data.add(Activity.all(), this, "activity_list");
};

Activity.prototype.turn_register = function () {
    var next_status = (this.register == "run"? "over": "run");
    Activity.alter_status(this.name, "register", next_status);
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
    var activity_list = Activity.all();
    var activity_found = _(activity_list).findWhere({name: name_of_activity});
    type_to_alter == "register"? activity_found.register = status_to_alter: activity_found.bid = status_to_alter;
    type_to_alter == "bid" && status_to_alter == "run"? activity_found.count += 1 : false;
    Data.save(activity_list, "activity_list");
    Activity.update_current_activity(activity_found);  
};

//外调方法

Activity.all = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

Activity.now = function () {
    var activity_now = localStorage.getItem("current_activity") || "";
    return _(Activity.all()).findWhere({name: activity_now});
};

Activity.exist = function () {
    return !_.isEmpty(Activity.all());
};

Activity.check_if_repeat = function (activity_name_to_check) {
    return _(Activity.all()).findWhere({name: activity_name_to_check});
};

Activity.on_going = function () {
    return _(Activity.all()).some(function (activity_on_iterator) { 
        return activity_on_iterator.register == "run" || activity_on_iterator.bid == "run";});
};

Activity.find_by_name = function (name_to_find) {
    var object_found = _(Activity.all()).findWhere({name: name_to_find});
    return new Activity(object_found.name, object_found.createdAt, object_found.register, object_found.bid, object_found.count);
};