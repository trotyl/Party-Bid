function Activity() {

}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem('actv_list')) || [];
};

Activity.save_all_items = function (whole_actv_list) {
    //window.alert("3");
    localStorage.setItem("actv_list", JSON.stringify(whole_actv_list));
    localStorage.setItem("actv_num", whole_actv_list.length);
    //window.alert("4");
};

Activity.if_new_item = function () {
    var is_new = localStorage.getItem("actv_new") || "false";
    if(is_new == 'true'){
        localStorage.setItem("actv_new", "false");
        return true;
    }
    else{
        return false;
    }
};

Activity.get_item_name = function () {
    var actv_name = localStorage.getItem("actv_name") || null;
    if(actv_name != null){
        return actv_name;
    }
    else{
        return null;
    }
};

Activity.check_if_null = function () {
    var actv_num = localStorage.getItem("actv_num") || 0;
    //window.alert("5" + actv_num);
    return actv_num != 0;
};

Activity.check_if_repeat = function (name_to_check) {
    var repeat = false;
    var whole_actv_list = JSON.parse(localStorage.getItem('actv_list')) || [];
    for (var i = whole_actv_list.length - 1; i >= 0; i--) {
        if(whole_actv_list[i].name == name_to_check) {
            repeat = true;
            break;
        }
    };
    return repeat;
}

Activity.add_new_item = function(new_item_name) {
    localStorage.setItem('actv_new', 'true');
    localStorage.setItem('actv_name', new_item_name);
};
