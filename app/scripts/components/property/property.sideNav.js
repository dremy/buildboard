'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:propertySideNav
 * @description
 * # Property Side Nav Component
 * Controller of the buildboardApp
 */
function sideNavCtrl() {
  $(".button-collapse").sideNav();
}

angular.module('bb.property')
  .component('sideNav', {
    templateUrl: 'scripts/components/property/property.sideNav.html',
    controller: sideNavCtrl,
    bindings: {
      property: '<'
    }
  });