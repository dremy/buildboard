'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:breadcrumbs
 * @description
 * # Property Breadcrumbs Component
 * Controller of the buildboardApp
 */
function breadcrumbsCtrl($state) {  
  // TO DO - Figure out why this gets executed like 6 times.
  function stateCheck(state) {
    for (var i = state.length - 1; i >= 0; i--) {
      if (state[i] === $state.current.name) {
        return true;
      }
    }
  }

  this.stateCheck = stateCheck;
}

angular.module('bb.property')
  .component('breadcrumbs', {
    templateUrl: 'scripts/components/property/property.breadcrumbs.html',
    controller: breadcrumbsCtrl,
    bindings: {
      property: '<',
      board: '<'
    }
  });