'use strict';

describe('The BidListController', function () {

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

    BidListController(scope, location, routeParams);
  });

  it('should be able to get the activity', function () {
    expect(scope.this_activity.name).toEqual('Activity 1');
  });

  it('should get the bid list', function () {
    expect(scope.bid_list.length).toEqual(1);
    activity.start_bid();
    scope.initiate_data();
    expect(scope.bid_list.length).toEqual(2);
  });

  it('should get the right bid number', function () {
    expect(scope.no_start).toEqual(false);
    activity.turn_register();
    scope.initiate_data();
    expect(scope.no_start).toEqual(true);    
  });

  it('should be able to go to bid detail', function () {
    scope.go_to_detail(0);
    expect(location.path).toHaveBeenCalledWith('/detail/Activity 1/bid/1');
  });

  it('should be able to go to register', function () {
    scope.go_to_register();
    expect(location.path).toHaveBeenCalledWith('/detail/Activity 1');
  });

  it('should be able to start bid', function () {
    scope.start_bid();
    scope.initiate_data();
    expect(scope.this_activity.count).toBe(2);
    expect(location.path).toHaveBeenCalledWith('/detail/Activity 1/bid/2');
  });

  
});
