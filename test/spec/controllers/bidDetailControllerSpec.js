'use strict';

describe('The BidDetailController', function () {

  var scope, location, routeParams;
  var activity, register, bid;

  beforeEach(function () {
    scope = {};
    location = { path: null };
    routeParams = { name: 'Activity 1', number: 1 };

    spyOn(location, 'path');

    localStorage.clear();
    activity = new Activity('Activity 1');
    activity.save();
    
    register = new Register('余泽江', '15528258522');
    register.save();

    activity.start_bid();
    bid = new Bid(5, '15528258522');
    bid.save();

    BidDetailController(scope, location, routeParams);
  });

  it('should get the right activity', function () {
    expect(scope.this_activity.name).toEqual('Activity 1');
  });

  it('should get the right bid number', function () {
    expect(scope.bid_number).toEqual(1);
  });

  it('should not be able to get the list', function () {
    expect(scope.record_list.length).toEqual(1);
  });

  xit('should be able to stop bid', function () {
    scope.end_bid();
    expect(location.path).toHaveBeenCalledWith('/detail/Activity 1/bid/1/result/true');
  });

  
});
