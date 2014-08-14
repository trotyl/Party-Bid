'use strict';

describe('The BidResultController', function () {

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
    activity.stop_bid();

    BidResultController(scope, location, routeParams);
  });

  it('should be able to get the activity', function () {
    expect(scope.this_activity.name).toEqual('Activity 1');
  });

  it('should be able to get the bid number', function () {
    expect(scope.bid_number).toEqual(1);
  });

  it('should get the record list', function () {
    expect(scope.record_list.length).toEqual(1);
  });

  it('should get the right bid result', function () {
    expect(scope.result.name).toEqual('余泽江');
  });

  it('should be able to go to bid stats', function () {
    scope.go_to_stats();
    expect(location.path).toHaveBeenCalledWith('/detail/Activity 1/bid/1/stats');
  });

});
