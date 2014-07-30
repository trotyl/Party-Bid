function Activity(activity_name) {
    this.name = activity_name;
    this.createdAt = Date.parse(new Date()).toString();
    this.register = "prepare";
    this.bid = "prepare";
    this.count = 0;
}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

var activity_list = Activity.get_all_items();

Activity.get_activities_refer = function () {
    return activity_list;
};

Activity.save_all_items = function () {
    localStorage.setItem("activity_list", JSON.stringify(activity_list));
};

Activity.update_global_config = function (activity_name, type_of_operation, status_to_change) {
    current_activity.name = activity_name;
    if(type_of_operation == "register") {
        current_activity.register = status_to_change;
    }
    else {
        current_activity.bid = status_to_change;
        current_activity.number = current_activity.count;
    }
    localStorage.setItem("current_activity", JSON.stringify(current_activity));
};

Activity.get_current_status = function () {
    return JSON.parse(localStorage.getItem("current_activity")) || {name: "", register: "prepare", bid: "", number: 0};
};

var current_activity = Activity.get_current_status();

Activity.get_status_refer = function () {
    return current_activity;
};

Activity.find_by_name = function (name_to_find) {
    return _.findWhere(activity_list, {name: name_to_find});
};

Activity.add_new_item = function (new_activity) {
    var activity_list = Activity.get_all_items();
    activity_list.push(new_activity);
    Activity.save_all_items();

    Activity.update_global_config(new_activity.name, "register", "prepare");
    Activity.update_global_config(new_activity.name, "bid", "prepare");
};

Activity.start_register = function (the_activity) {
    the_activity.register = "run";
    Activity.save_all_items();
    Activity.update_global_config(the_activity.name, "register", "run"); 
};

Activity.stop_register = function (the_activity) {
    the_activity.register = "over";
    Activity.save_all_items();
    Activity.update_global_config(the_activity.name, "register", "over"); 
};

Activity.start_bid = function (the_activity) {
    the_activity.bid = "run";
    the_activity.count += 1;
    Activity.save_all_items();
    Activity.update_global_config(the_activity.name, "bid", "run"); 
    return the_activity.count;
};
Activity.stop_bid = function (the_activity) {
    the_activity.bid = "over";
    Activity.save_all_items();
    Activity.update_global_config(the_activity.name, "bid", "over"); 
};

Activity.check_ifnot_null = function () {
    return !_.isEmpty(activity_list);
};

Activity.check_if_repeat = function (activity_name) {
    return !!(_(activity_list).findWhere({name: activity_name}));
};

Activity.one_on_register = function () {
    return !!(_.findWhere(activity_list, {register: "run"}));
};
