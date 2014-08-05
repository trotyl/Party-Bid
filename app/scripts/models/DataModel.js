function Data () {
}

Data.check_if_contains = function (list, data_to_check) {
    return _(list).findWhere(data_to_check);
};

Data.refresh_ui_list = function (page_type) {
	var ui_scope = angular.element("#" + page_type).scope();
	if(typeof(ui_scope.update_when_receive) == "function")  {
		ui_scope.$apply(function () { 
			ui_scope.update_when_receive(); 
		});
	}
};

Data.add = function (list, data_to_save, type) {
    list.push(data_to_save);
    Data.save_all(activity_list, type);
};

Data.save = function (list, type) {
	localStorage.setItem(type, JSON.stringify(list));
};

Data.read_list = function (type) {
	return JSON.parse(localStorage.getItem(type)) || [];
};