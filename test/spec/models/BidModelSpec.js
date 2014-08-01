'use strict';

describe('Model: BidModel', function () {
  var bid_list;

  // load the controller's module
  beforeEach(module('partyBidApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Bid.compute_result("", 1)).toBe(true);
  });
});
