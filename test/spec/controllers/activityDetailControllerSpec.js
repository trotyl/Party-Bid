'use strict';

describe('Controller: activityList', function () {

	var scope, location, routeParams;

	beforeEach(function () {
		scope = {};
		location = { path: function (url) {
			this.path = url;
		}};
		routeParams = { name: 'Activity 1'};

		localStorage.clear();
		var activity_1 = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_1.save();
		var activity_2 = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_2.save();
		var activity_3 = new Activity("Activity 3", Date.parse(new Date()), "prepare", "prepare", 0);
		activity_3.save();
	});

	it('should attach a list of awesomeThings to the scope', function () {
		ActivityDetailController(scope, location, routeParams);
		console.log(scope);
		expect(scope.this_activity.name).toBe('Activity 1');
	});
});
