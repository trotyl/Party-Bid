function Activity() {
}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

Activity.save_all_items = function (activity_list) {
    localStorage.setItem("activity_list", JSON.stringify(activity_list));
};

Activity.update_global_config = function (activity_name, type_of_operation, status_to_change) {
    var current_activity = Activity.get_current_item();
    current_activity.name = activity_name;
    if(type_of_operation == "register") {
        current_activity.register = status_to_change;
    }
    else {
        current_activity.bid = status_to_change;
    }
    localStorage.setItem("current_activity", JSON.stringify(current_activity));
};

Activity.get_current_item = function () {
    return JSON.parse(localStorage.getItem("current_activity")) || {name: "", register: "prepare", bid: "", number: ""};
};

Activity.add_new_item = function (activity_name, activity_time) {
    var activity_list = Activity.get_all_items();
    activity_list.push({name:activity_name, createdAt:activity_time.toString(), register:"prepare", bid:"null", count:0});
    Activity.save_all_items(activity_list);

    Activity.update_global_config(activity_name, "register", "prepare");
    Activity.update_global_config(activity_name, "bid", "null");
};

Activity.check_ifnot_null = function () {
    var activity_list = Activity.get_all_items();
    return !_.isEmpty(activity_list);
};

Activity.check_if_repeat = function (activity_name) {
    var activity_list = Activity.get_all_items();
    return !!(_.findWhere(activity_list, {name: activity_name}));
};

Activity.is_running = function (activity_name) {
    var activity_list = Activity.get_all_items();
    return !!(_.findWhere(activity_list, {name: activity_name, register: "run"}));
};

Activity.one_on_register = function () {
    var activity_list = Activity.get_all_items();
    return !!(_.findWhere(activity_list, {register: "run"}));
};

