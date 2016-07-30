'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyEditCtrl($scope, $rootScope, $state, drupal, messages, preloader, alert) { 

  // Initialize variables.
  //-------------------------------
  var nid = $state.params.nid;
  var types = ["Home", "Multi-Family", "Lot"];

  // Define functions.
  //-------------------------------
  function cancelEditProperty() {
    $state.go('portfolio'); //TO DO - Return to original property via params.
  }

  function saveProperty() {
    preloader.setState(true);
    this.property.title = this.property.field_address.und[0].thoroughfare + " " + this.property.field_address.und[0].locality + ", " + this.property.field_address.und[0].administrative_area + " " + this.property.field_address.und[0].postal_code;
    console.log(this.property);
    //Save node. 
    drupal.node_save(this.property).then(
      function(data) {
        alert.message = 'Congratulations! Node ' + this.property.title + ' is updated!';
        alert.type = 'success';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
        $state.go('portfolio'); //TO DO - Return to original property via params.
      }, function(reason) {
        console.log(reason);
        alert.message = 'Saving failed due to ' + reason.statusText + '. Try again later.';
        alert.type = 'warning';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }
    );
  }

  // Perform on load.
  //-------------------------------
  //Set loading.
  preloader.setState(true);

  //Load node.
  drupal.node_load(nid).then(
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
  );

  // Register functions to scope
  //-------------------------------
  $scope.cancelEditProperty = cancelEditProperty;
  $scope.saveProperty = saveProperty;
  $scope.types = types;
}

angular.module('bb.property')
  .controller('PropertyEditCtrl', propertyEditCtrl);
