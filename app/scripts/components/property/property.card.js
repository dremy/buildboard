'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:card
 * @description
 * # Property Card Component
 * Controller of the buildboardApp
 */
function propertyCardCtrl() {
  
  function hoverIn() {
    this.hover = true;
  }

  function hoverOut() {
    this.hover = false;
  }

  this.hoverIn = hoverIn;
  this.hoverOut = hoverOut;
}

angular.module('bb.property')
  .component('propertyCard', {
    templateUrl: 'scripts/components/property/property.card.html',
    controller: propertyCardCtrl,
    bindings: {
      property: '<',
      status: '<'
    }
  })
  .component('addPropertyCard', {
    templateUrl: 'scripts/components/property/add.property.card.html'
  });