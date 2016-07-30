'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the buildboardApp
 */

// Pass in $scope, and propertiesApi and TO DO zApi service 
function PortfolioCtrl($scope, drupal, NgMap, preloader, messages, alert) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  //Initialize variables.
  //------------------------------------
  var types = ["Home", "Multi-Family", "Lot"]; // Setup Types Options.
  var selected = -1;
  var query = {
    parameters: {
      'type': 'property'
    }
  };

  NgMap.getMap({id: 'portfolio-map'}).then(function(map) {
    console.log('NgMap.getMap in PortfolioCtrl', map);
  });
  // Define Functions
  //------------------------------------
  function refreshPortfolio() {
    preloader.setState(true);
    drupal.entity_node_index(query).then(
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
    );
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

  //Start Adding Property.
  function startAddProperty() {    
    $scope.property = {
      "address":"",
      "city":"",
      "state":"",
      "zip":"",
      "teaserPhoto":"",
      "teaser":"",
      "propertyType": "",
      "units": "",
      "purchasePrice": "",
      "activityCount": "",
      "boardCount": "",
      "tags": "",
    };

    setView('addProperty');
    initializeForm();
  }

  function cancelProperty() {
    setView('propertiesList');
  }

  function addProperty() {
    preloader.setState(true);

    //Some behind the scenes defining of the title.
    var title = this.property.address + " " + this.property.city + ", " + this.property.state + " " + this.property.zip;

    //Setup the property to be posted.
    var node = {
      "title": title,
      "type": "property",
      "language": "und",
      "field_address": {
        "und": [
          {
            "country":"US",
            "administrative_area": this.property.state,
            "sub_administrative_area": null,
            "locality": this.property.city,
            "dependent_locality":"",
            "postal_code": this.property.zip,
            "thoroughfare": this.property.address,
            "premise": "",
            "sub_premise": null,
            "organisation_name": null,
            "name_line": null,
            "first_name": null,
            "last_name": null,
            "data": null
          }
        ]
      }/*,
       TO DO - Property Types
      "field_property_type": {
        "und": [
          {
            "value":this.property.propertyType
          }
        ]
      },
      "field_purchase_price": {
        "und": [
          {
              "value": parseInt(this.property.purchasePrice),
              "target_id": "240"
          },
        ]
      }*/    
    };

    //Save node.
    drupal.node_save(node).then(
      function(data) {
        alert.message = 'Congratulations! Node ' + node.title + ' is created!';
        alert.type = 'success';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }, function(reason) {
        alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
        alert.type = 'success';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }
    );

    // Change views
    setView('propertiesList');
    setTimeout(refreshPortfolio, 2000);
  }
  
  //Start Edit Property.
  function startEditProperty(index) {
    // Get the right one
    selected = index;
    console.log($scope.properties[selected].nid);
//    $scope.property = $scope.properties[selected];
//    $state.go('propertyEditForm');
    initializeForm();
  }

  function saveProperty() {
    preloader.setState(true);
    this.property.title = this.property.field_address.und[0].thoroughfare + " " + this.property.field_address.und[0].locality + ", " + this.property.field_address.und[0].administrative_area + " " + this.property.field_address.und[0].postal_code;

    //Save node. 
    drupal.node_save(this.property).then(
      function(data) {
        alert.message = 'Congratulations! Node ' + this.property.title + ' is updated!';
        alert.type = 'success';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }, function(reason) {
        alert.message = 'Saving failed due to ' + reason.statusText + '. Try again later.';
        alert.type = 'warning';
        messages.add(alert.message, alert.type, alert.dt);
        preloader.setState(false);
      }
    );

    setView('propertiesList');
    setTimeout(refreshPortfolio, 2000);
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
    drupal.node_delete(id).then(
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
  $scope.properties = [];
  $scope.propertiesUnits = 0;
  $scope.propertiesCosts = 0;
  $scope.types = types; // Assign to dropdown.
  setView('propertiesList');   // Define propertiesList as the default
  $scope.refreshPortfolio = refreshPortfolio();   // Execute refreshPortfolio

  //Register functions to $scope.
  //------------------------------------
  $scope.refreshPortfolio = refreshPortfolio;
  $scope.startAddProperty = startAddProperty;
  $scope.cancelProperty = cancelProperty;
  $scope.startEditProperty = startEditProperty;
  $scope.saveProperty = saveProperty;
  $scope.startRemoveProperty = startRemoveProperty;
  $scope.removeProperty = removeProperty;
}

angular.module('buildboardApp')
  .controller('PortfolioCtrl', PortfolioCtrl);