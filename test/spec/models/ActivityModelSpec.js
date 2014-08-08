'use strict';

describe('ActivityModel:', function () {
	var activityList;
	localStorage.clear();

	beforeEach(function () {
		
	});

	describe('The Activity list', function () {
		it('should be null', function () {
			expect(Activity.all().length).toEqual(0);
		});

		it('should have one activity', function () {
			var new_activity = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
			new_activity.save();
			expect(Activity.all().length).toEqual(1);
		});

		it('should have two activity', function () {
			var new_activity = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 0);
			new_activity.save();
			expect(Activity.all().length).toEqual(2);
		});
	});

	describe('The Activity 2', function () {
		it('should be found correctly', function () {
			var activity = Activity.find_by_name('The Activity 2');
			expect(activity.name).toEqual('The Activity 2');
		});

		it('should be in prepare of register', function () {
			
		});
	});

});
