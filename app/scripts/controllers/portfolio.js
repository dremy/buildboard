'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the buildboardApp
 */

// Pass in $scope, and propertiesApi and TO DO zApi service 
function PortfolioCtrl($scope, $rootScope, drupal) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  function alerting(message, type) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });        
    $rootScope.globals.isLoading = false; 
  }

  var query = {
    parameters: {
      'type': 'property'
    }
  };

  function refreshPortfolio() {
    $rootScope.globals.isLoading = true;
    $scope.message = '';
    /* NEW SERVICE */
    drupal.entity_node_index(query) // TO DO: .success(fn).error(fn)
      .then(function (nodes) { // Success!
        $scope.properties = nodes; // Display
        var properties = nodes; // TO DO: necessary?
        $scope.propertiesCosts = propertiesCosts(nodes); // Update Costs Value 
        $rootScope.globals.isLoading = false; // No more loading spinner
      }, function (reason) { // Error...
        console.log(reason);
        $scope.message = "Why you no like me... " + reason.statusText;
        $rootScope.globals.isLoading = false; // No more loading spinner
      });
  }

  // Set the model
  $scope.properties = [];
  $scope.propertiesUnits = 0;
  $scope.propertiesCosts = 0;
  $scope.message = '';

  // Execute refreshPortfolio
  $scope.refreshPortfolio = refreshPortfolio();
  $scope.refreshPortfolio = refreshPortfolio;

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


  var selected = -1;
  setView('propertiesList');   // Define propertiesList as the default
  var types = ["Home", "Multi-Family", "Lot"]; // Setup Types Options.
  $scope.types = types; // Assign to dropdown.

  // Setup the Form
  function initializeForm() {
    $('textarea#teaser').characterCounter();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mmmm d, yyyy', // April 15, 2016
    });
    $('select').material_select();
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
    $rootScope.globals.isLoading = true; //TO DO - Set preloader

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
    drupal.node_save(node).then(function(data) {
        var message = 'Congratulations! Node ' + node.title + ' is created!';
        var type = 'success';
        alerting(message, type);
    }, function(reason) {
      var message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
      var type = 'success';
      alerting(message, type);
    });

    // Change views
    setView('propertiesList');
    setTimeout(refreshPortfolio, 2000);
  }
  
  //Start Edit Property.
  function startEditProperty(index) {
    // Get the right one
    selected = index;

    $scope.property = $scope.properties[selected];
    setView('editProperty');
    initializeForm();
  }

  function saveProperty() {
    $rootScope.globals.isLoading = true;
    this.property.title = this.property.field_address.und[0].thoroughfare + " " + this.property.field_address.und[0].locality + ", " + this.property.field_address.und[0].administrative_area + " " + this.property.field_address.und[0].postal_code;

    //Save node. 
    drupal.node_save(this.property).then(function(data) {
      var message = 'Congratulations! Node ' + this.property.title + ' is updated!';
      var type = 'success';
      alerting(message, type);
    }, function(reason) {
      var message = 'Saving failed due to ' + reason.statusText + '. Try again later.';
      var type = 'warning';
      alerting(message, type);
    });

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
    $rootScope.globals.isLoading = true;
    var id = $scope.properties[selected].nid;
    var title = $scope.properties[selected].title;
    
    //Delete Node.
    drupal.node_delete(id).then(function(data) {
      if (data[0]) {
        var message = 'Congratulations! ' + title + ' has been deleted!';
        var type = 'success';
        alerting(message, type);
      }
    }, function(reason) {
      var message = 'Deleting failed due to ' + reason.statusText + '. Try again later.';
      var type = 'warning';
      alerting(message, type);
    });
  
    setView('propertiesList')
    setTimeout(refreshPortfolio, 2000);
  }

  //Register functions to $scope; Exposed on view event "click"
  $scope.startAddProperty = startAddProperty;
  $scope.cancelProperty = cancelProperty;
  $scope.addProperty = addProperty;
  $scope.startEditProperty = startEditProperty;
  $scope.saveProperty = saveProperty;
  $scope.startRemoveProperty = startRemoveProperty;
  $scope.removeProperty = removeProperty;
}

angular.module('buildboardApp')
  .controller('PortfolioCtrl', PortfolioCtrl);

/*OLD PROPERTY MODEL
var property = {
  "title": title,
  "type": "property",
  "nid": this.property.nid,
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
        "data":null
      }
    ]
  },
  /*"field_property_type": {
    "und": [
      {
        "value":this.property.propertyType
      }
    ]
  },
  "field_purchase_price": {
    "und": [
      {
          "value": this.property.purchasePrice,
          "target_id": "240"
      },
    ]
  }     
};*/
