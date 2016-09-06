'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:sideNavCal
 * @description
 * # Property Side Nav Cal Component
 * Controller of the buildboardApp
 */
function sideNavCalCtrl() {
  $(".button-collapse").sideNav();
}

angular.module('bb.calendar')
  .component('sideNavCal', {
    templateUrl: 'scripts/components/calendar/calendar.sideNav.html',
    controller: sideNavCalCtrl,
    bindings: {
      relationships: '<'
    }
  });