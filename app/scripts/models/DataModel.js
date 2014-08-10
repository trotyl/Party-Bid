function Data () {}

Data.refresh_ui_list = function (page_type) {
	var ui_scope = angular.element("#" + page_type).scope() || { $apply: angular.noop };
	ui_scope.$apply(function () { 
		ui_scope.update_data(); 
	});
};

Data.add = function (list, data_to_save, type) {
    list.push(data_to_save);
    Data.save(list, type);
};

Data.save = function (list, type) {
	localStorage.setItem(type, JSON.stringify(list));
};

Data.get_sendback_text = function () {
	return dictionary;
};

Data.get_native_accessor = function () {
	return native_accessor;
};