'use strict';

describe('Model: BidModel', function () {
	var bidList;

	beforeEach(function () {
		bidList = [];
	});

	describe('The Bid list should be right count.', function () {
		it('The Bid list should be null', function () {
			expect(bidList.length).toEqual(0);
		})
	});

});
