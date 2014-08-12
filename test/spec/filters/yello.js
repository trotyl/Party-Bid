'use strict';

describe('Filter: yello', function () {

  // load the filter's module
  beforeEach(module('partyBidApp'));

  // initialize a new instance of the filter before each test
  var yello;
  beforeEach(inject(function ($filter) {
    yello = $filter('yello');
  }));

  it('should return the input prefixed with "yello filter:"', function () {
    var text = 'angularjs';
    expect(yello(text)).toBe('yello filter: ' + text);
  });

});
