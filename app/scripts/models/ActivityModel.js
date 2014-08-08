function Activity(name, createdAt, register, bid, count) {
    this.name = name;
    this.createdAt = createdAt;
    this.register = register;
    this.bid = bid;
    this.count = count;
}

//实例方法
Activity.prototype.save = function () {
    Data.add(Activity.all(), this, "activity_list");
    Activity.update_current_activity(this); 
};

Activity.prototype.turn_register = function () {
    var next_status = (this.register == "run"? "over": "run");
    Activity.alter_status(this.name, "register", next_status);
};

Activity.prototype.start_bid = function () {
    Activity.alter_status(this.name, "bid", "run");
};

Activity.prototype.stop_bid = function () {
    Activity.alter_status(this.name, "bid", "over");
};

//内调方法
Activity.update_current_activity = function (activity) {
    localStorage.setItem("current_activity", activity.name);
};

Activity.alter_status = function (name, type, status) {
    var activity_list = Activity.all();
    var found = _(activity_list).findWhere({name: name});
    type == "register"? found.register = status: found.bid = status;
    type == "bid" && status == "run" && (found.count += 1);
    Data.save(activity_list, "activity_list");
    Activity.update_current_activity(found);  
};

//外调方法
Activity.all = function () {
    return JSON.parse(localStorage.getItem("activity_list")) || [];
};

Activity.now = function () {
    var activity_now = localStorage.getItem("current_activity") || "";
    return _(Activity.all()).findWhere({name: activity_now});
};

Activity.exist = function () {
    return !_.isEmpty(Activity.all());
};

Activity.on_going = function () {
    return _(Activity.all()).some(function (activity) { 
        return activity.register == "run" || activity.bid == "run";});
};

Activity.check_if_repeat = function (activity_name) {
    return _(Activity.all()).findWhere({name: activity_name});
};

Activity.find_by_name = function (activity_name) {
    var found = _(Activity.all()).findWhere({name: activity_name}) || {};
    return new Activity(found.name, found.createdAt, found.register, found.bid, found.count);
};
