function Activity(name_of_activity) {
    this.name = name_of_activity;
    this.createdAt = Date.parse(new Date()).toString();
    this.register = "prepare";
    this.bid = "prepare";
    this.count = 0;

}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

Activity.save_all_items = function (activity_list) {
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
    return _.findWhere(activity_list, {name: name_to_find});
};

Activity.add_new_item = function (new_activity) {
    var activity_list = Activity.get_all_items();
    activity_list.push(new_activity);
    Activity.save_all_items(activity_list);
    Activity.update_current_activity(new_activity);
};

Activity.start_register = function (activity_to_start_register) {
    var activity_list = Activity.get_all_items();
    var activity_found = _(activity_list).findWhere({name: activity_to_start_register.name})
    activity_found.register = "run";
    Activity.save_all_items(activity_list);
    Activity.update_current_activity(activity_found); 
};

Activity.stop_register = function (activity_to_stop_register) {
    var activity_list = Activity.get_all_items();
    var activity_found = _(activity_list).findWhere({name: activity_to_stop_register.name})
    activity_found.register = "over";
    Activity.save_all_items(activity_list);
    Activity.update_current_activity(activity_found); 
};

Activity.start_bid = function (activity_to_start_bid) {
    var activity_list = Activity.get_all_items();
    var activity_found = _(activity_list).findWhere({name: activity_to_start_bid.name});
    activity_found.bid = "run";
    activity_found.count += 1;
    Activity.save_all_items(activity_list);
    Activity.update_current_activity(activity_found); 
};
Activity.stop_bid = function (activity_to_stop_bid) {
    var activity_list = Activity.get_all_items();
    var activity_found = _(activity_list).findWhere({name: activity_to_stop_bid.name});
    activity_found.bid = "over";
    Activity.save_all_items(activity_list);
    Activity.update_current_activity(activity_found); 
};

Activity.check_ifnot_null = function () {
    var activity_list = Activity.get_all_items();
    return !_.isEmpty(activity_list);
};

Activity.check_if_repeat = function (activity_name_to_check) {
    var activity_list = Activity.get_all_items();
    return !!(_(activity_list).findWhere({name: activity_name_to_check}));
};

Activity.one_on_progress = function () {
    var activity_list = Activity.get_all_items();
    return _(activity_list).some(function (activity_on_iterator) {
        return activity_on_iterator.register == "run" || activity_on_iterator.bid == "run";
    });
};
