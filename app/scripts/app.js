'use strict';

angular
  .module('partyBidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

var dictionary;

var native_access;
$(document).ready(function () {
    localStorage.signing_up = '';

    native_access = new NativeAccess();

});