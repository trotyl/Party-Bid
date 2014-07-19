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

// Activity.prototype.process_order = function () {
//     var orders = Activity.get_orders();
//     if (this.have_ordered()) {
//         orders.push(this)
//     }
//     else {
//         var current_order = this;
//         var orders = $.map(orders, function (order) {
//             if (order.person_name == current_order.person_name) {
//                 order = current_order;
//             }
//             return order
//         })
//     }
//     localStorage.setItem("orders", JSON.stringify(orders));
//     localStorage.removeItem('food_name');
//     localStorage.removeItem('person_name');
// }

// Activity.clear_food_data = function () {
//     localStorage.removeItem('food_name');
// }

// Activity.get_total_money = function () {
//     var money = 0
//     for (var i = 0; i < Activity.get_orders().length; i++) {
//         money = money + Activity.get_orders()[i].food_price;
//     }
//     return money;
// }

// Activity.get_no_order_people = function () {
//     var all_people = $.map(Person.get_all_people(), function (person) {
//         return person.name;
//     });
//     var order_people = $.map(Activity.get_orders(), function (order) {
//         return order.person_name;
//     })
//     var no_order_people = $.map(all_people, function (person) {
//         if ($.inArray(person, order_people) == -1) {
//             return person;
//         }
//     })
//     return no_order_people;
// }