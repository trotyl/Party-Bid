'use strict';

describe('The ActivityListController', function () {

  var scope, location, http;
  var activity;

  beforeEach(function () {
    scope = {};
    location = { path: null };
    http = { get: null };

    spyOn(location, 'path');
    spyOn(http, 'get').and.returnValue({ success: function () {}});

    localStorage.clear();
    activity = new Activity("Activity 1", Date.parse(new Date()), "prepare", "prepare", 0);
    activity.save();
    activity = new Activity("Activity 2", Date.parse(new Date()), "prepare", "prepare", 0);
    activity.save();
    activity = new Activity("Activity 3", Date.parse(new Date()), "prepare", "prepare", 0);
    activity.save();

    ActivityListController(scope, location, http);
  });

  it('should go to create activity only when no activity', function () {
    expect(location.path).not.toHaveBeenCalled();
    localStorage.clear();

    scope.initiate_data();
    expect(location.path).toHaveBeenCalledWith('/create');
  });

  it('should be able to get all activity', function () {
    expect(scope.activity_list.length).toEqual(3);
  });

  it('should not be able to create when one is on going', function () {
    expect(scope.no_create).toEqual(false);
    activity.turn_register();
    scope.initiate_data();
    expect(scope.no_create).toEqual(true);
  });

  it('should get the response json', function () {
    expect(http.get).toHaveBeenCalledWith('datas/jsons/message_back.json');
  });

  it('should be able to go to create', function () {
    expect(location.path).not.toHaveBeenCalled();
    scope.go_to_create();
    expect(location.path).toHaveBeenCalledWith('/create')
  });

  it('should be able to go to register', function () {
    expect(location.path).not.toHaveBeenCalled();
    scope.go_to_detail('Activity 1');
    expect(location.path).toHaveBeenCalledWith('/detail/Activity 1')
  });
});
