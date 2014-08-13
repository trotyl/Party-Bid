'use strict';

describe('The ActivityDetailController', function () {

	var scope, location, routeParams;

	beforeEach(function () {
		scope = {};
		location = { path: ''};
		routeParams = { name: 'Activity 1'};

		spyOn(location, 'path');

		localStorage.clear();
		var activity_1 = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_1.save();
		var activity_2 = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_2.save();
		var activity_3 = new Activity("Activity 3", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_3.save();

		ActivityDetailController(scope, location, routeParams);
	});

	it('should find the proper activity', function () {
		console.log(scope);
		expect(scope.this_activity.name).toEqual('Activity 1');
		expect(scope.status).toEqual('prepare');
	});

	it('should not be able to start when other running', function () {
		expect(scope.no_start).toBe(false);
		var activity_2 = Activity.find_by_name('Activity 2');
		activity_2.turn_register();
		scope.initiate_data();
		expect(scope.no_start).toBe(true);
	});

	it('should be able to go to bid list', function () {
		expect(location.path).not.toHaveBeenCalled();
		scope.go_to_bid();
		expect(location.path).toHaveBeenCalledWith('/detail/Activity 1/bid');
	});

	it('should be able to start register', function () {
		scope.alter_status();
		expect(scope.status).toEqual('run');
		scope.alter_status();
		expect(scope.status).toEqual('over');
	});

});
