function Activity(name, createdAt, register, bid, count) {
    this.name = name;
    this.createdAt = createdAt;
    this.register = register;
    this.bid = bid;
    this.count = count;
}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

Activity.prototype.save = function () {
    var activity_list = Activity.get_all_items();
    var activity_found = _(activity_list).findWhere({name: this.name})
    activity_found? activity_found = this: activity_list.push(this);
    localStorage.setItem("activity_list", JSON.stringify(activity_list));
};

Activity.save_all = function(activity_list) {
    localStorage.setItem("activity_list", JSON.stringify(activity_list));
};

Activity.update_current_activity = function (activity_to_update) {
    localStorage.setItem("current_activity", JSON.stringify(activity_to_update));
};

Activity.get_current_item = function () {
    return JSON.parse(localStorage.getItem("current_activity")) || new Activity("");
};

Activity.find_by_name = function (name_to_find) {
    var activity_list = Activity.get_all_items();
    var object_found = _.findWhere(activity_list, {name: name_to_find});
    return new Activity(object_found.name, object_found.createdAt, object_found.register, object_found.bid, object_found.count);
};

Activity.alter_status = function (name_of_activity, type_to_alter, status_to_alter) {
    var activity_list = Activity.get_all_items();
    var activity_found = _(activity_list).findWhere({name: name_of_activity})
    type_to_alter == "register"? activity_found.register = status_to_alter: activity_found.bid = status_to_alter;
    type_to_alter == "bid" && status_to_alter == "run"? activity_found.count += 1 : false;
    Activity.save_all(activity_list);
    Activity.update_current_activity(activity_found);  
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

Activity.check_ifnot_null = function () {
    var activity_list = Activity.get_all_items();
    return !_.isEmpty(activity_list);
};

Activity.check_if_repeat = function (activity_name_to_check) {
    var activity_list = Activity.get_all_items();
    return !!(_(activity_list).findWhere({name: activity_name_to_check}));
};

Activity.check_if_one_on_progress = function () {
    var activity_list = Activity.get_all_items();
    return _(activity_list).some(function (activity_on_iterator) {
        return activity_on_iterator.register == "run" || activity_on_iterator.bid == "run";
    });
};
