'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:card
 * @description
 * # Property Card Component
 * Controller of the buildboardApp
 */
function cardCtrl() {  
}

angular.module('bb.property')
  .component('propertyCard', {
    templateUrl: 'scripts/components/property/property.card.html',
    controller: cardCtrl,
    bindings: {
      property: '<',
      status: '<'
    }
  });