'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyCtrl($state, prop, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var property = this;
  // Define functions.
  //-------------------------------
  // Perform on load.
  //-------------------------------
  if (prop.data) {
    property.details = prop.data;
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.property', [])
  .controller('PropertyCtrl', propertyCtrl);