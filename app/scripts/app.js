'use strict';

var partyBidApp = angular
  .module('partyBidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

var native_access;
$(document).ready(function () {
    localStorage.signing_up = '';

    native_access = new NativeAccess();

});