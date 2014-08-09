'use strict';

describe('RegisterModel:', function () {

	var new_activity;
	var new_register;

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

	describe('The Register list', function () {
		beforeEach(function () {
		});

		it('should be count right', function () {
			expect(Register.all().length).toEqual(8);

			localStorage.clear();
			expect(Register.all().length).toEqual(0);
		});

		it('should be get by activity properly', function () {
			expect(Register.read_members_of_activity({name: "Activity 1"}).length).toEqual(0);
			expect(Register.read_members_of_activity({name: "Activity 2"}).length).toEqual(5);
			expect(Register.read_members_of_activity({name: "Activity 3"}).length).toEqual(3);
		});

		it('can find member name by its phone', function () {
			expect(Register.find_name_by_phone("11111111111")).toEqual("Yu Zejiang");
			expect(Register.find_name_by_phone("00000000000")).toBeUndefined();
		});


		it('phone should not be repeat', function () {
			expect(Register.check_if_repeat('11111111111')).toBeTruthy();
			expect(Register.check_if_repeat('55555555555')).toBeFalsy();			
		});
	});

});
