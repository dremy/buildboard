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
  var id = $state.params.id;
  var types = ["Home", "Multi-Family", "Lot"];

  property.details = prop.data;
  // Define functions.
  //-------------------------------

  function saveProperty() {
    preloader.setState(true);
    property.details.location.formatted = property.details.location.address;
    property.details.location.formatted += ' ' + property.details.location.city;
    property.details.location.formatted += ', ' + property.details.location.state;
    property.details.location.formatted += ' ' + property.details.location.zip;

    property.details.title = property.details.location.formatted;
    console.log(property.details);
    //Save node. 
    $http.put(location.origin + '/api/property' + '/' + id, property.details)
      .then(
        function(data) {
          console.log(data);
          alert.message = 'Congratulations! Node ' + property.details.title + ' is updated!';
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
          $state.go('property', {id: property.details._id}); //TO DO - Return to original property via params.
      });
  }

  // Perform on load.
  //-------------------------------

  //Load node.
  /*.node_load(nid).then(
    function(node) { // SUCCESS - Node loaded.
      $scope.property = node; // Assign to scope.
      preloader.setState(false);
    }, function(reason) { // ERROR - Node NOT loaded.
      console.log(reason);
      //Alert.
      message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
      type = 'warning';
      messages.add(message, type, dt);
      preloader.setState(false);      
    }
  );*/

  // Register functions to scope
  //-------------------------------
  property.saveProperty = saveProperty;
  property.types = types;
}

angular.module('bb.property')
  .controller('PropertyEditCtrl', propertyEditCtrl);
