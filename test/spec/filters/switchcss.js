'use strict';

describe('Filter: switchCss', function () {

  // load the filter's module
  beforeEach(module('partyBidApp'));

  // initialize a new instance of the filter before each test
  var switchCss;
  beforeEach(inject(function ($filter) {
    switchCss = $filter('switchCss');
  }));

  it('should return the input prefixed with "switchCss filter:"', function () {
    var text = 'angularjs';
    expect(switchCss(text)).toBe('switchCss filter: ' + text);
  });

});
