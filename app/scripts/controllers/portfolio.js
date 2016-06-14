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
    for (var i = 0; i < $scope.properties.length; i++) {
      propCosts += parseInt(properties[i].field_purchase_price.und[0].value);
    }
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

  // ADD PROPERTY
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

    // Queue up the zApi on key up
    // var address = "&address=" + this.property.address;
    // var citystatezip = "&citystatezip" + this.property.city + "%2C+" + this.property.state + "%20" this.property.zip;
  }

  function cancelProperty() {
    setView('propertiesList');
  }

  function addProperty() {
    $rootScope.globals.isLoading = true; //TO DO - Set preloader

    // Some behind the scenes defining of the title.
    var title = this.property.address + " " + this.property.city + ", " + this.property.state + " " + this.property.zip;

    // Setup the property to be posted.
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
      },
      /* TO DO - Property Types
      "field_property_type": {
        "und": [
          {
            "value":this.property.propertyType
          }
        ]
      },*/
      "field_purchase_price": {
        "und": [
          {
              "value": parseInt(this.property.purchasePrice),
              "target_id": "240"
          },
        ]
      }    
    };

    // TO DO - Troubleshoot posting files
    // console.log(this.property.teaserPhoto);

    /* NEW SERVICE */
    drupal.node_save(node).then(function(data) {
        alert('Created node: ' + data.nid);
        // Update Units & Costs Totals
        refreshPortfolio();
        $rootScope.globals.isLoading = false;
        //$scope.propertiesCosts = propertiesCosts();        
    }, function(reason) {
      console.log('Adding failed due to ' + reason.status + reason.statusText + '. Try again later.');
      $scope.message = reason.status + ' ' + reason.statusText;
      $rootScope.globals.isLoading = false;
    });

    // Change views
    setView('propertiesList');
  }
  
  // EDIT PROPERTY
  function startEditProperty(index) {
    // Get the right one
    selected = index;

    $scope.property = $scope.properties[selected];
    setView('editProperty');
    initializeForm();
    console.log($scope.property);
  }

  function saveProperty() {
    $rootScope.globals.isLoading = true;
    this.property.title = this.property.field_address.und[0].thoroughfare + " " + this.property.field_address.und[0].locality + ", " + this.property.field_address.und[0].administrative_area + " " + this.property.field_address.und[0].postal_code;

    /* NEW SERVICE*/ 
    drupal.node_save(this.property).then(function(data) {
        alert('Updated node: ' + data.nid);
        // Update Units & Costs Totals
        $scope.propertiesCosts = propertiesCosts();
        refreshPortfolio();
        $rootScope.globals.isLoading = false;
    }, function(reason) {
      alert('Saving failed due to ' + reason.status + reason.statusText + '. Try again later.');
      console.log(reason);
      $scope.message = reason.status + reason.statusText;
      $rootScope.globals.isLoading = false;
    });
    
    /* OLD SERVICE
    useBackend(property, function () {
      return propertiesApi.updateProperty(property);
    });*/
    setView('propertiesList');
  }

  // REMOVE PROPERTY
  function startRemoveProperty(index) {
    selected = index;
    setView('removeProperty');
    $scope.removalProperty = $scope.properties[selected];
  }

  function removeProperty() {
    var id = $scope.properties[selected].nid;
    /* OLD SERVICE
    useBackend(id, function () {
      return propertiesApi.removeProperty(id);
    });*/

    setView('propertiesList');

    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }

  // ADD, EDIT, REMOVE PROPERTY
  // Register functions to $scope; Exposed on view event "click"
  $scope.startAddProperty = startAddProperty;
  $scope.cancelProperty = cancelProperty;
  $scope.addProperty = addProperty;
  $scope.startEditProperty = startEditProperty;
  $scope.saveProperty = saveProperty;
  $scope.startRemoveProperty = startRemoveProperty;
  $scope.removeProperty = removeProperty;

  function useBackend(id, operation) {
    $scope.message = '';
    operation()
      .success(
        function (data) {
          refreshPortfolio();        
          console.log(data);
        })
      .error(
        function (errorInfo, status) {
          setError(errorInfo, status, id);
        });
  }

  function setError(errorInfo, status) {
    if (status === 401) {
      $scope.message = "Authorization failed.";
    } else if (angular.isDefined(errorInfo.reasonCode) && errorInfo.reasonCode === "TenantLimitExceeded") {
      $scope.message = "You cannot add more locations.";
    } else {
      $scope.message = errorInfo.message;
    }
  }
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
