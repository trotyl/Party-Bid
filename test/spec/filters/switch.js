'use strict';

describe('Filter: switch', function () {

  // load the filter's module
  beforeEach(module('partyBidApp'));

  // initialize a new instance of the filter before each test
  var switch;
  beforeEach(inject(function ($filter) {
    switch = $filter('switch');
  }));

  it('should return the input prefixed with "switch filter:"', function () {
    var text = 'angularjs';
    expect(switch(text)).toBe('switch filter: ' + text);
  });

});
