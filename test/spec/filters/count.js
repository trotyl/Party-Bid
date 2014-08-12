'use strict';

describe('Filter: count', function () {

  // load the filter's module
  beforeEach(module('partyBidApp'));

  // initialize a new instance of the filter before each test
  var count;
  beforeEach(inject(function ($filter) {
    count = $filter('count');
  }));

  it('should return the input prefixed with "count filter:"', function () {
    var text = 'angularjs';
    expect(count(text)).toBe('count filter: ' + text);
  });

});
