'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:propertyDeleteForm
 * @description
 * # propertyDeleteCtrl
 * Controller of the buildboardApp
 */

function propertyDeleteCtrl(propertyService, $state, prop, preloader, messages, alert) {

  //Initialize variables.
  //------------------------------------
  var property = this;

  // Define Functions
  //------------------------------------
  // Setup the Form
  function cancelProperty() {
    $state.go('property', {id: prop.data._id});
  }

  function removeProperty() {
    preloader.setState(true);
    propertyService.removeProperty(prop.data)
      .success(function(data) {
        alert.message = 'Congratulations! ' + prop.data.title + ' has been deleted!';
        alert.type = 'success';
        messages.add(alert.message, alert.type, alert.dt);
      })
      .error(function(reason) {
        alert.message = 'Deleting failed due to ' + reason.statusText + '. Try again later.';
        alert.type = 'warning';
        messages.add(alert.message, alert.type, alert.dt);
      }
    ).then(function(){
      $state.go('portfolio');
      preloader.setState(false);
    });
  }
  //Perform on load.
  //------------------------------------
  property.details = prop.data;
  //Register functions to $scope.
  //------------------------------------
  property.cancelProperty = cancelProperty;
  property.removeProperty = removeProperty;
}

angular.module('bb.property')
  .controller('PropertyDeleteCtrl', propertyDeleteCtrl);