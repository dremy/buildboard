'use strict';

/**
 * @ngdoc function
 * @name bb.property.controller:propertyDeleteForm
 * @description
 * # propertyDeleteCtrl
 * Controller of the bb.property
 */

function propertyDeleteCtrl(relationshipService, $state, rel, preloader, messages, alert) {

  //Initialize variables.
  //------------------------------------
  var property = this,
  id = {
    _id: rel.data[0]._id
  };

  // Define Functions
  //------------------------------------
  // Setup the Form
  function cancelProperty() {
    $state.go('property', {id: rel.data._property._id});
  }

  function removeProperty() {
    preloader.setState(true);
    relationshipService.removeRelationship(id)
      .success(function(data) {
        alert.message = 'Congratulations! ' + property.details.title + ' has been deleted!';
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
  console.log(rel.data[0]._property);
  property.details = rel.data[0]._property;
  //Register functions to $scope.
  //------------------------------------
  property.cancelProperty = cancelProperty;
  property.removeProperty = removeProperty;
}

angular.module('bb.property')
  .controller('PropertyDeleteCtrl', propertyDeleteCtrl);