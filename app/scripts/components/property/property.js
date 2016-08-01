'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyCtrl($state, prop, NgMap, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var property = this;
  // Define functions.
  //-------------------------------

  // Perform on load.
  //-------------------------------
  if (prop.data) {
    property.details = prop.data;
    console.log(property.details);
    //Setup property address
    property.details.location.formatted = property.details.location.address;
    property.details.location.formatted += ' ' + property.details.location.city;
    property.details.location.formatted += ', ' + property.details.location.state;
    property.details.location.formatted += ' ' + property.details.location.zip;
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.property', [])
  .controller('PropertyCtrl', propertyCtrl);
