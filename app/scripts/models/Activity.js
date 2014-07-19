function Activity() {

}

Activity.get_all_items = function () {
    return JSON.parse(localStorage.getItem("actv_list")) || [];
}

Activity.if_new_item = function () {
    var is_new = localStorage.getItem("actv_list") || "false";
    if(is_new == 'true'){
        return true;
    }
    else{
        return false;
    }
}

Activity.get_item_name = function () {
    var actv_name = localStorage.getItem("actv_name") || null;
    if(actv_name != null){
        return actv_name;
    }
    else{
        return null;
    }
}

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