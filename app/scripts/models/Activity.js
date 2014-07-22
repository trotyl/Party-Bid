function Activity() {

}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem('activity_list')) || [];
};

Activity.save_all_items = function (whole_activity_list) {
    localStorage.setItem("activity_list", JSON.stringify(whole_activity_list));
    localStorage.setItem("activity_num", whole_activity_list.length);
};

Activity.add_new_item = function(new_item_name, new_item_time) {
    activity_list = Activity.get_all_items();
    activity_list.splice(0,0,{name:new_item_name, createdAt:new_item_time.toString(), status:"prepare"});
    Activity.save_all_items(activity_list);

    Activity.update_global_status("prepare");
};

Activity.check_if_null = function () {
    var activity_num = localStorage.getItem("activity_num") || 0;
    return activity_num != 0;
};

Activity.check_if_repeat = function (name_to_check) {
    var repeat = false;
    var whole_activity_list = JSON.parse(localStorage.getItem('activity_list')) || [];
    for (var i = whole_activity_list.length - 1; i >= 0; i--) {
        if(whole_activity_list[i].name == name_to_check) {
            repeat = true;
            break;
        }
    };
    return repeat;
};

Activity.is_running = function (activity_name) {
    activity_list = Activity.get_all_items();
    for (var i = activity_list.length - 1; i >= 0; i--) {
        if(activity_list[i].name == activity_name) {
            return (activity_list[i].status == "run");
        }
    };
    return false;
};

Activity.start_activity = function (activity_name) {
    activity_list = Activity.get_all_items();
    for (var i = activity_list.length - 1; i >= 0; i--) {
        if(activity_list[i].name == activity_name) {
            activity_list[i].status = "run";
            Activity.save_all_items(activity_list);
            break;
        }
    };

    Activity.update_global_status("run");   
};

Activity.stop_activity = function (activity_name) {
    activity_list = Activity.get_all_items();
    for (var i = activity_list.length - 1; i >= 0; i--) {
        if(activity_list[i].name == activity_name) {
            activity_list[i].status = "over";
            Activity.save_all_items(activity_list);
            break;
        }
    };

    Activity.update_global_status("over");
};

Activity.one_in_progress = function () {
    var progress = false;
    var whole_activity_list = JSON.parse(localStorage.getItem('activity_list')) || [];
    for (var i = whole_activity_list.length - 1; i >= 0; i--) {
        if(whole_activity_list[i].status == "run") {
            progress = true;
            break;
        }
    };
    return progress;
};

Activity.update_global_status = function (status) {
    if(Activity.one_in_progress()) {
        status = "run";
    }
    localStorage.setItem("activity_status", status);
};
