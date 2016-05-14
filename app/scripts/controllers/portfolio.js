'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the buildboardApp
 */
angular.module('buildboardApp')
  .controller('PortfolioCtrl', PortfolioCtrl)
  .factory('propertiesApi', propertiesApi)
  .constant('apiUrl','http://api.buildboard.io/properties/v1/node/'); // Register new service

// Create API service function
function propertiesApi($http, apiUrl) {

  function get(param) {
    return request("GET", param);
  }

  function post(data) {
    return request("POST", null, data);
  }

  function put(data) {
    console.log(data);
    var param = data.nid;
    return request("PUT", param, data);
  }

  function del(param) {
    return request("DELETE", param);
  }

  function request(verb, param, data) {
    var req = {
      method: verb,
      url: url(param),
      data: data
    }
    return $http(req);
  }

  function url(param) {
    if (param == null || !angular.isDefined(param)) {
      param = '';
    }
    return apiUrl + param;
  }
  // Return object with getProperties function
  return {
    getProperties: function () {
      //2var url = apiUrl + '/properties/v1/node'
      //1 return properties;
      //2return $http.get(url);
      return get();
    },
    getPropertiesById: function (id) {
      return get(id);
    },
    addProperty: function (property) {
      return post(property);
    },
    removeProperty: function (id) {
      return del(id);
    },
    updateProperty: function (property) {
      return put(property);
    }
  }
}

// Pass in $scope, and propertiesApi service
function PortfolioCtrl($scope, propertiesApi) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // Set the model
  $scope.properties = [];
  $scope.propertiesUnits = 0;
  $scope.propertiesCosts = 0;
  $scope.errorMessage = '';

  // Register functions to $scope
  $scope.isLoading = isLoading;
  $scope.refreshPortfolio = refreshPortfolio;

  $scope.refreshPortfolio= refreshPortfolio();

  var loading = false;

  function isLoading() {
    return loading;
  }

  function refreshPortfolio() {
    loading = true;
    $scope.errorMessage = '';
    propertiesApi.getProperties()
      .success(function (data) {
        var filesURL = "http://api.buildboard.io/sites/default/files/";
        $scope.properties = data;
        var properties = data;
        $scope.propertiesUnits = propertiesUnits(properties);
        $scope.propertiesCosts = propertiesCosts(properties);
        loading = false;
      })
      .error(function () {
        $scope.errorMessage = "Request failed";
        loading = false;
      });
  }

  // REPORT - UNIT COUNT: Gather total unit count
  function propertiesUnits(properties) {
    var propertiesUnits = 0;
    for (var i = 0; i < $scope.properties.length; i++) {
      propertiesUnits += properties[i].field_units.und.length;
    };
    return propertiesUnits;
  }

  // REPORT - COSTS COUNT:  Gather total costs
  function propertiesCosts(properties) {
    var propertiesCosts = 0;
    for (var i = 0; i < $scope.properties.length; i++) {
      propertiesCosts += parseInt(properties[i].field_purchase_price.und[0].value);
    };
    return propertiesCosts;
  }

  // ADD, EDIT, REMOVE PROPERTY
  // Assign functions to be exposed on view event "click"
  $scope.startAddProperty = startAddProperty;
  $scope.cancelProperty = cancelProperty;
  $scope.addProperty = addProperty;
  $scope.startEditProperty = startEditProperty;
  $scope.saveProperty = saveProperty;
  $scope.startRemoveProperty = startRemoveProperty;
  $scope.removeProperty = removeProperty;


  var selected = -1;

  // Define propertiesList as the default
  setView('propertiesList');

  // Create function for setting the argument in setView to the controllers scope
  function setView(view) {
    $scope.view = view;
  }

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
    }
    setView('addProperty');
    initializeForm();
  }

  function cancelProperty() {
    setView('propertiesList');
  }

  function addProperty() {
    var filename = '';    

    var title = this.property.address + " " + this.property.city + ", " + this.property.state + " " + this.property.zip;
    var newProperty = {
      "title": title,
      "address": this.property.address,
      "city": this.property.city,
      "state": this.property.state,
      "zip": this.property.zip,
      "teaserPhoto": "images/" + filename,
      "teaser": this.property.teaser, 
      "propertyType": this.property.propertyType,
      "units": this.property.units,
      "purchasePrice": parseInt(this.property.purchasePrice),
      "activityCount": this.property.activityCount,
      "boardCount": this.property.boardCount,
      "tags": this.property.tags,
    }

    var property = {
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
            "data":null
          }
        ]
      },
      "field_units": {
        "und": [{

        }],
      },
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
      }     
    }
    
    console.log(property);
    // Hit the Service button!
    useBackend(-1, function () {
      return propertiesApi.addProperty(
        property)
    })

    this.errorMessage = "";
    this.errorMessage = $scope.errorMessage;
    // Make show up on page
    $scope.properties.push(newProperty);

    // Change views
    setView('propertiesList');
    // Update Units & Costs Totals
    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }

  // Setup Types Options.
  var types = ["Home", "Multifamily", "Lot"];
  $scope.types = types;
  
  // EDIT PROPERTY
  function startEditProperty(index) {
    // Get the right one
    selected = index;

    $scope.property = $scope.properties[selected];
    setView('editProperty');
    /*for (var i = 0; i < types.length; i++) {
      if(types[i] == property.field_property_type.und[0].value) {
        $('select[name="propertyType"]').value(types[i]).attr('selected');
      }
    }*/
    initializeForm();
  }

  function saveProperty() {
    var title = this.property.address + " " + this.property.city + ", " + this.property.state + " " + this.property.zip;
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
      "field_units": {
        "und": [{

        }],
      },
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
              "value": this.property.purchasePrice,
              "target_id": "240"
          },
        ]
      }     
    }

    /*$scope.properties[selected] = {
      "address": this.property.address,
      "city": this.property.city,
      "state": this.property.state,
      "zip": this.property.zip,
      "teaserPhoto": this.property.teaserPhoto,
      "teaser": this.property.teaser, 
      "propertyType": this.property.propertyType,
      "units": this.property.units,
      "purchasePrice": parseInt(this.property.purchasePrice),
      "activityCount": this.property.activityCount,
      "boardCount": this.property.boardCount,
      "tags": this.property.tags,
    }*/
    useBackend(property, function () {
      return propertiesApi.updateProperty(property)
    })
    setView('propertiesList');
    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }

  // REMOVE PROPERTY
  function startRemoveProperty(index) {
    selected = index;
    setView('removeProperty');
    $scope.removalProperty = $scope.properties[selected];
  }

  function removeProperty() {
    console.log($scope.properties[selected].nid);
    var id = $scope.properties[selected].nid
    // $scope.properties.splice(selected,1);
    // id = selected;
    useBackend(id, function () {
      return propertiesApi.removeProperty(id);
    })

    setView('propertiesList');

    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }

  function useBackend(id, operation) {
    $scope.errorMessage = '';
    operation()
      .success(
        function (data) {
          refreshPortfolio();        
          console.log(data);
        })
      .error(
        function (errorInfo, status) {
          setError(errorInfo, status, id)
        });    
  }

  function setError(errorInfo, status, id) {
    if (status == 401) {
      $scope.errorMessage = "Authorization failed."
    } else if (angular.isDefined(errorInfo.reasonCode)
        && errorInfo.reasonCode == "TenantLimitExceeded")
    {
      $scope.errorMessage =
          "You cannot add more locations.";
    } else {
      $scope.errorMessage = errorInfo.message;
    }
  }
}