'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyEditCtrl($state, $http, prop, messages, preloader, alert) { 

  // Initialize variables.
  //-------------------------------
  var property = this;

  // Define functions.
  //-------------------------------
  function saveProperty() {
    preloader.setState(true);
/*    property.details.location.formatted = property.details.location.address;
    property.details.location.formatted += ' ' + property.details.location.city;
    property.details.location.formatted += ', ' + property.details.location.state;
    property.details.location.formatted += ' ' + property.details.location.zip;

    property.details.title = property.details.location.formatted;*/
    console.log(property.details);
    //Save node. 
    propertyService.updateProperty(property.details)
      .then(
        function(data) {
          console.log(data);
          alert.message = 'Congratulations! ' + property.details.title + ' is updated!';
          alert.type = 'success';
          messages.add(alert.message, alert.type, alert.dt);
        }, function(reason) {
          console.log(reason);
          alert.message = 'Saving failed due to ' + reason.statusText + '. Try again later.';
          alert.type = 'warning';
          messages.add(alert.message, alert.type, alert.dt);
        }
      ).then(function() {
          preloader.setState(false);
          $state.go('property', {pid: property.details._id}); //TO DO - Return to original property via params.
      });
  }

  // Perform on load.
  //-------------------------------
  property.details = prop.data;
  console.log(property.details);
  property.useCodes = [
    {
      key: "SingleFamily",
      value: "House"
    },
    {
      key: "VacantResidentialLand",
      value: "Land"
    },
    {
      key: "",
      value: "Multi-Family"
    }];

  // Register functions to scope
  //-------------------------------
  property.saveProperty = saveProperty;
}

angular.module('bb.property')
  .controller('PropertyEditCtrl', propertyEditCtrl);