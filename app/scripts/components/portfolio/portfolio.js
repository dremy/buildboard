'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:portfolioCtrl
 * @description
 * # portfolioCtrl
 * Controller of the buildboardApp
 */

function portfolioCtrl($scope, properties, NgMap, preloader, messages, alert) {

  //Initialize variables.
  //------------------------------------
  var selected = -1;

  $scope.properties = properties.data;
  console.log($scope.properties);
  /*propertyService.getProperties()
    .then(function(data){
      console.log(data);
    });*/

  NgMap.getMap({id: 'portfolio-map'}).then(function(map) {
    console.log('NgMap.getMap in PortfolioCtrl', map);
  });
  // Define Functions
  //------------------------------------
  function refreshPortfolio() {
    //preloader.setState(true);
    
    /*drupal.entity_node_index(query).then(
      function(nodes) { // SUCCESS - Nodes loaded.
        $scope.properties = nodes; // Display
        $scope.propertiesCosts = propertiesCosts(nodes); // Update Costs Value 
        preloader.setState(false);
      }, function(reason) { // ERROR - Nodes NOT loaded.
        console.log(reason);
        alert.message = "Why you no like me... " + reason.statusText;
        alert.type = 'warning';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }
    );*/
  }

  // REPORT - UNIT COUNT: Gather total unit count
  function propertiesUnits(properties) {
    var propUnits = 0;
    /*TO DO - for (var i = 0; i < $scope.properties.length; i++) {
      propUnits += properties[i].field_units.und.length;
    }*/
    return propUnits;
  }

  // REPORT - COSTS COUNT:  Gather total costs
  function propertiesCosts(properties) {
    var propCosts = 0;
    /*for (var i = 0; i < $scope.properties.length; i++) {
      propCosts += parseInt(properties[i].field_purchase_price.und[0].value);
    }*/
    return propCosts;
  }

  // Create function for setting the argument in setView to the controllers scope
  function setView(view) {
    $scope.view = view;
  }

  // Setup the Form
  function initializeForm() {
    $('textarea#teaser').characterCounter();
  }

  function cancelProperty() {
    setView('propertiesList');
  }

  //Start Remove Property.
  function startRemoveProperty(index) {
    selected = index;
    setView('removeProperty');
    $scope.removalProperty = $scope.properties[selected];
  }

  function removeProperty() {
    preloader.setState(true);
    var id = $scope.properties[selected].nid;
    var title = $scope.properties[selected].title;
    
    //Delete Node.
    propertyService.removeProperty(id).then(
      function(data) {
        if (data[0]) {
          alert.message = 'Congratulations! ' + title + ' has been deleted!';
          alert.type = 'success';
          messages.add(alert.message, alert.type, alert.dt);
          preloader.setState(false);
        }
      }, function(reason) {
        alert.message = 'Deleting failed due to ' + reason.statusText + '. Try again later.';
        alert.type = 'warning';
        alert.messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }
    );
  
    setView('propertiesList');
    setTimeout(refreshPortfolio, 2000);
  }
  //Perform on load.
  //------------------------------------
  $scope.propertiesUnits = 0;
  $scope.propertiesCosts = 0;
  setView('propertiesList');   // Define propertiesList as the default
  $scope.refreshPortfolio = refreshPortfolio();   // Execute refreshPortfolio

  //Register functions to $scope.
  //------------------------------------
  $scope.refreshPortfolio = refreshPortfolio;
  $scope.cancelProperty = cancelProperty;
  $scope.startRemoveProperty = startRemoveProperty;
  $scope.removeProperty = removeProperty;
}

angular.module('buildboardApp')
  .controller('PortfolioCtrl', portfolioCtrl);