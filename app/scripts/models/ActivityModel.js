function Activity(activity_name) {
    this.name = activity_name;
    this.createdAt = Date.parse(new Date()).toString();
    this.register = "prepare";
    this.bid = "prepare";
    this.count = 0;
    this.start_register = function () {
        this.register = "run";
        Activity.save_all_items();
        Activity.update_global_config(activity_name, "register", "run"); 
    };
    this.stop_register = function () {
        this.register = "over";
        Activity.save_all_items();
        Activity.update_global_config(activity_name, "register", "over"); 
    };
    this.start_bid = function () {
        this.bid = "run";
        Activity.save_all_items();
        Activity.update_global_config(activity_name, "bid", "run"); 
    };
    this.stop_bid = function () {
        this.bid = "over";
        Activity.save_all_items();
        Activity.update_global_config(activity_name, "bid", "over"); 
    };
}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

var activity_list = Activity.get_all_items();

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
    }
    localStorage.setItem("current_activity", JSON.stringify(current_activity));
};

Activity.get_current_item = function () {
    return JSON.parse(localStorage.getItem("current_activity")) || {name: "", register: "prepare", bid: "", number: 0};
};

var current_activity = Activity.get_current_item();

Activity.find_by_name = function (name_to_find) {
    return _.findWhere(activity_list, {name: name_to_find});
};

Activity.add_new_item = function (new_activity) {
    activity_list.push(new_activity);
    Activity.save_all_items();

    Activity.update_global_config(new_activity.name, "register", "prepare");
    Activity.update_global_config(new_activity.name, "bid", "prepare");
};

// Activity.prototype.start_register = function () {
//     this.register = "run";
//     Activity.save_all_items();
// };

// Activity.prototype.stop_register = function () {
//     this.register = "over";
//     Activity.save_all_items();
// };

Activity.check_ifnot_null = function () {
    return !_.isEmpty(activity_list);
};

Activity.check_if_repeat = function (activity_name) {
    return !!(_.findWhere(activity_list, {name: activity_name}));
};

Activity.one_on_register = function () {
    return !!(_.findWhere(activity_list, {register: "run"}));
};
