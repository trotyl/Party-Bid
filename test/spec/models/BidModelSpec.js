'use strict';

describe('BidModel:', function () {

	beforeEach(function () {
		localStorage.clear();

		new_activity = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
		new_activity.save();

		new_activity = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 0);
		new_activity.save();
		new_register = new Register("Yu Zejiang", "11111111111");
		new_register.save();
		new_register = new Register("Li Yang", "22222222222");
		new_register.save();
		new_register = new Register("Lu Laijin", "33333333333");
		new_register.save();
		new_register = new Register("Cheng Congye", "44444444444");
		new_register.save();
		new_register = new Register("Mao Ningchuan", "55555555555");
		new_register.save();

		new_activity = new Activity("Activity 3", Date.parse(new Date()), "prepare", "prepare", 0);
		new_activity.save();
		new_register = new Register("Yu Zejiang", "11111111111");
		new_register.save();
		new_register = new Register("Li Yang", "22222222222");
		new_register.save();
		new_register = new Register("Lu Laijin", "33333333333");
		new_register.save();
	});

	describe('The Bid list', function () {
		beforeEach(function () {
		});

		it('should be count right', function () {
			expect(Activity.all().length).toEqual(3);

			localStorage.clear();
			expect(Activity.all().length).toEqual(0);
		});

		it('should be now on Activity 2', function () {
			expect(Activity.now().name).toEqual("Activity 3");
		});

		it('should be exist', function () {
			expect(Activity.exist()).toBe(true);
		});

	});

	describe('The Activity 1', function () {
		var activity;

		beforeEach(function () {
			activity = Activity.find_by_name('Activity 1');
		});

		it('should be found correctly', function () {
			expect(activity.name).toEqual('Activity 1');

			var another_activity = Activity.find_by_name('Activity 99');
			expect(another_activity.name).toBeUndefined();
		});

		it('should be in proper status of register', function () {
			expect(activity.register).toEqual('prepare');

			activity.turn_register();
			activity = Activity.find_by_name('Activity 1');
			expect(activity.register).toEqual('run');

			activity.turn_register();
			activity = Activity.find_by_name('Activity 1');
			expect(activity.register).toEqual('over');

			activity.turn_register();
			activity = Activity.find_by_name('Activity 1');
			expect(activity.register).toEqual('run');
		});

		it('should be in proper status of bid', function () {
			expect(activity.bid).toEqual('prepare');
			expect(activity.count).toEqual(0);

			activity.start_bid();
			activity = Activity.find_by_name('Activity 1');
			expect(activity.bid).toEqual('run');
			expect(activity.count).toEqual(1);

			activity.stop_bid();
			activity = Activity.find_by_name('Activity 1');
			expect(activity.bid).toEqual('over');
			expect(activity.count).toEqual(1);

			activity.start_bid();
			activity = Activity.find_by_name('Activity 1');
			expect(activity.bid).toEqual('run');
			expect(activity.count).toEqual(2);
		});

		it('should should be current one by register', function () {

			expect(Activity.now().name).toEqual("Activity 3");
			activity.turn_register();
			expect(Activity.now().name).toEqual("Activity 1");
		});

		it('should should be current one by bid', function () {
			expect(Activity.now().name).toEqual("Activity 3");

			activity.start_bid();
			expect(Activity.now().name).toEqual("Activity 1");
		});

		it('should be affects status of on-going', function () {
			expect(Activity.on_going()).toBe(false);

			activity.turn_register();
			activity = Activity.find_by_name('Activity 1');
			expect(Activity.on_going()).toBe(true);

			activity.turn_register();
			activity = Activity.find_by_name('Activity 1');
			expect(Activity.on_going()).toBe(false);

			activity.start_bid();
			activity = Activity.find_by_name('Activity 1');
			expect(Activity.on_going()).toBe(true);

			activity.stop_bid();
			activity = Activity.find_by_name('Activity 1');
			expect(Activity.on_going()).toBe(false);
		});

		it('name should not be repeat', function () {
			expect(Activity.check_if_repeat('Activity 1')).toBeTruthy();
			expect(Activity.check_if_repeat('Activity 99')).toBeFalsy();			
		});
	});

});
