'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyCtrl($state, drupal, NgMap, messages, alert, preloader, property) { 
  // Initialize variables.
  //-------------------------------  

  // Define functions.
  //-------------------------------

  // Perform on load.
  //-------------------------------
  if (property) {
    this.details = property;
    //Setup property address
    this.address = property.field_address.und[0].thoroughfare;
    this.address += ' ' + property.field_address.und[0].locality;
    this.address += ', ' + property.field_address.und[0].administrative_area;
    this.address += ' ' + property.field_address.und[0].postal_code;
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.property', [])
  .controller('PropertyCtrl', propertyCtrl);
