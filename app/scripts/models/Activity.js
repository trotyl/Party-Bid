function Activity() {

}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem('activity_list')) || [];
};

Activity.save_all_items = function (activity_list) {
    localStorage.setItem("activity_list", JSON.stringify(activity_list));
    localStorage.setItem("activity_num", activity_list.length);
};

Activity.add_new_item = function(new_item_name, new_item_time) {
    activity_list = Activity.get_all_items();
    activity_list.splice(0,0,{name:new_item_name, createdAt:new_item_time.toString(), status:"prepare"});
    Activity.save_all_items(activity_list);

    Activity.update_global_status("prepare", new_item_name);
};

Activity.check_if_null = function () {
    var activity_num = localStorage.getItem("activity_num") || 0;
    return activity_num != 0;
};

Activity.check_if_repeat = function (name_to_check) {
    // var repeat = false;
    // var activity_list = JSON.parse(localStorage.getItem('activity_list')) || [];
    // for (var i = activity_list.length - 1; i >= 0; i--) {
    //     if(activity_list[i].name == name_to_check) {
    //         repeat = true;
    //         break;
    //     }
    // };
    var repeat = !!(_.findWhere(activity_list, {name: name_to_check}));
    return repeat;
};

Activity.is_running = function (activity_name) {
    activity_list = Activity.get_all_items();
    // for (var i = activity_list.length - 1; i >= 0; i--) {
    //     if(activity_list[i].name == activity_name) {
    //         return (activity_list[i].status == "run");
    //     }
    // };
    var result = !!(_.findWhere(activity_list, {name: activity_name, status: "run"}));
    return result;
};

Activity.start_activity = function (activity_name) {
    activity_list = Activity.get_all_items();
    // for (var i = activity_list.length - 1; i >= 0; i--) {
    //     if(activity_list[i].name == activity_name) {
    //         activity_list[i].status = "run";
    //         Activity.save_all_items(activity_list);
    //         break;
    //     }
    // };
    _.findWhere(activity_list, {name: activity_name}).status = "run";
    Activity.save_all_items(activity_list);

    Activity.update_global_status("run", activity_name);   
};

Activity.stop_activity = function (activity_name) {
    activity_list = Activity.get_all_items();
    // for (var i = activity_list.length - 1; i >= 0; i--) {
    //     if(activity_list[i].name == activity_name) {
    //         activity_list[i].status = "over";
    //         Activity.save_all_items(activity_list);
    //         break;
    //     }
    // };
    _.findWhere(activity_list, {name: activity_name}).status = "over";
    Activity.save_all_items(activity_list);

    Activity.update_global_status("over", activity_name);
};

Activity.one_in_progress = function () {
    var activity_list = JSON.parse(localStorage.getItem('activity_list')) || [];
    // var progress = false;
    // for (var i = activity_list.length - 1; i >= 0; i--) {
    //     if(activity_list[i].status == "run") {
    //         progress = true;
    //         break;
    //     }
    // };
    var progress = !!(_.findWhere(activity_list, {status: "run"}));
    return progress;
};

Activity.update_global_status = function (status, name) {
    localStorage.setItem("activity_status", status);
    localStorage.setItem("activity_name", name);
};