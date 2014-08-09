'use strict';

describe('BidModel:', function () {
	var new_activity;
	var new_register;
	var new_bid;

	beforeEach(function () {
		localStorage.clear();

		new_activity = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
		new_activity.save();

		new_activity = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 1);
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

		new_activity = new Activity("Activity 3", Date.parse(new Date()), "prepare", "prepare", 2);
		new_activity.save();
		new_register = new Register("Yu Zejiang", "11111111111");
		new_register.save();
		new_register = new Register("Li Yang", "22222222222");
		new_register.save();
		new_register = new Register("Lu Laijin", "33333333333");
		new_register.save();

		new_bid = new Bid(5, "11111111111", "Activity 2", 1);
		new_bid.save();
		new_bid = new Bid(5, "22222222222", "Activity 2", 1);
		new_bid.save();
		new_bid = new Bid(15, "33333333333", "Activity 2", 1);
		new_bid.save();
		new_bid = new Bid(50, "44444444444", "Activity 2", 1);
		new_bid.save();
		new_bid = new Bid(250, "55555555555", "Activity 2", 1);
		new_bid.save();
		new_bid = new Bid(5, "11111111111", "Activity 3", 1);
		new_bid.save();
		new_bid = new Bid(5, "22222222222", "Activity 3", 1);
		new_bid.save();
		new_bid = new Bid(5, "33333333333", "Activity 3", 1);
		new_bid.save();
		new_bid = new Bid(5, "11111111111", "Activity 3", 2);
		new_bid.save();
		new_bid = new Bid(10, "22222222222", "Activity 3", 2);
		new_bid.save();
	});

	describe('The Bid list ', function () {

		beforeEach(function () {
		});

		it('should be count right', function () {
			expect(Bid.all().length).toEqual(10);

			localStorage.clear();
			expect(Bid.all().length).toEqual(0);
		});

		it('should be read right', function () {
			expect(Bid.read_bids_of_activity({count: 0}).length).toEqual(0);
			expect(Bid.read_bids_of_activity({count: 1}).length).toEqual(1);
			expect(Bid.read_bids_of_activity({count: 2}).length).toEqual(2);
			expect(Bid.read_bids_of_activity({count: 2})[0].name).toEqual('竞价 1');
		});

	});

	describe('The Bid ', function () {

		beforeEach(function () {
		});

		it('should be read records correctly', function () {
			expect(Bid.read_records_of_bid({name: 'Activity 1'}, 1).length).toEqual(0);
			expect(Bid.read_records_of_bid({name: 'Activity 2'}, 1).length).toEqual(5);
			expect(Bid.read_records_of_bid({name: 'Activity 2'}, 2).length).toEqual(0);
			expect(Bid.read_records_of_bid({name: 'Activity 3'}, 1).length).toEqual(3);
			expect(Bid.read_records_of_bid({name: 'Activity 3'}, 2).length).toEqual(2);
		});

		it('should be read stats correctly', function () {
			expect(Bid.read_stats_of_bid({name: 'Activity 1'}, 1).length).toEqual(0);
			expect(Bid.read_stats_of_bid({name: 'Activity 2'}, 1).length).toEqual(4);
			expect(Bid.read_stats_of_bid({name: 'Activity 2'}, 2).length).toEqual(0);
			expect(Bid.read_stats_of_bid({name: 'Activity 3'}, 1).length).toEqual(1);
			expect(Bid.read_stats_of_bid({name: 'Activity 3'}, 2).length).toEqual(2);
		});

		it('should be compute result correctly', function () {
			expect(Bid.compute_result({name: 'Activity 1'}, 1).price).toBeUndefined();
			expect(Bid.compute_result({name: 'Activity 2'}, 1).price).toEqual(15);
			expect(Bid.compute_result({name: 'Activity 2'}, 2).price).toBeUndefined();
			expect(Bid.compute_result({name: 'Activity 3'}, 1).price).toBeUndefined();
			expect(Bid.compute_result({name: 'Activity 3'}, 2).price).toEqual(5);
		});

		it('phone should be already register', function () {
			expect(Bid.check_if_register('99999999999')).toBeFalsy();
			expect(Bid.check_if_register('33333333333')).toBeTruthy();			
		});

		it('phone should not be repeat', function () {
			expect(Bid.check_if_repeat('11111111111')).toBeTruthy();
			expect(Bid.check_if_repeat('33333333333')).toBeFalsy();			
		});
	});

});
