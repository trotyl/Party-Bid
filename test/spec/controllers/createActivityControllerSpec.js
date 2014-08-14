'use strict';

describe('The CreateActivityController', function () {

	var scope, location;

	beforeEach(function () {
		scope = {};
		location = { path: ''};

		spyOn(location, 'path');

		localStorage.clear();
		var activity_1 = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_1.save();
		var activity_2 = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_2.save();
		var activity_3 = new Activity("Activity 3", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_3.save();

		CreateActivityController(scope, location);
	});

	it('should not show warning at first ', function () {
		expect(scope.show_warning).toEqual(false);
	});

	it('should not show back when no activity', function () {
		expect(scope.show_back).toBe(true);
		localStorage.clear();
		scope.initiate_data();
		expect(scope.show_back).toBe(false);
	});

	it('should not be able to use same name', function () {
		scope.create_activity('Activity 1');
		expect(scope.show_warning).toEqual(true);
	});

	it('should be able to create when name is right', function () {
		expect(location.path).not.toHaveBeenCalled();
		scope.create_activity('Activity 4');
		expect(Activity.all().length).toEqual(4);
		expect(location.path).toHaveBeenCalledWith('/detail/Activity 4');
	});

	it('should not display warning when reinput', function () {
		scope.create_activity('Activity 1');
		scope.inputting();
		expect(scope.show_warning).toEqual(false);
	});

});
