function Activity() {

}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem('activity_list')) || [];
};

Activity.save_all_items = function (whole_activity_list) {
    //window.alert("3");
    localStorage.setItem("activity_list", JSON.stringify(whole_activity_list));
    localStorage.setItem("activity_num", whole_activity_list.length);
    //window.alert("4");
};

Activity.add_new_item = function(new_item_name, new_item_time) {
    activity_list = Activity.get_all_items();
    activity_list.splice(0,0,{name:new_item_name, createdAt:new_item_time.toString(), status:"prepare"});
    Activity.save_all_items(activity_list);
};

// Activity.if_new_item = function () {
//     var is_new = localStorage.getItem("activity_new") || "false";
//     if(is_new == 'true'){
//         localStorage.setItem("activity_new", "false");
//         return true;
//     }
//     else{
//         return false;
//     }
// };

// Activity.get_item_name = function () {
//     var activity_name = localStorage.getItem("activity_name") || null;
//     if(activity_name != null){
//         return activity_name;
//     }
//     else{
//         return null;
//     }
// };

Activity.check_if_null = function () {
    var activity_num = localStorage.getItem("activity_num") || 0;
    //window.alert("5" + activity_num);
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
}

