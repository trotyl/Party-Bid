function View () {
}

View.refresh_ui_list = function (page_type) {
	var ui_scope = angular.element("#" + page_type).scope();
	if(typeof(ui_scope.update_when_receive) == "function")  {
		ui_scope.$apply(function () { 
			ui_scope.update_when_receive(); 
		});
	}
};