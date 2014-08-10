'use strict';

describe('Controller: activityList', function () {

  // load the controller's module
  beforeEach(module('partyBidApp'));

  var ActivityListController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivityListController = $controller('ActivityListController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
