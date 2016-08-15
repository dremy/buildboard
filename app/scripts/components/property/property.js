'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyCtrl($state, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var property = this;
  console.log('relationship', rel.data[0]);
  // Define functions.
  //-------------------------------
  // Perform on load.
  //-------------------------------
  if (rel.data) {
    property.details = rel.data[0]._property;
    property.boards = rel.data[0]._boards;

    for (var i in property.boards) {
      if (typeof property.boards[i]._tags !== 'undefined' && property.boards[i]._tags.length > 0) {
        console.log('tags', property.boards[i]._tags);
      }
    } 
    console.log('property', property.details);
    console.log('boards', property.boards);
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.property', [])
  .controller('PropertyCtrl', propertyCtrl);