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
  .constant('apiUrl','http://api.buildboard.io'); // Register new service

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
  $scope.errorMessgae = '';

  // Register functions to $scope
  $scope.isLoading = isLoading;
  $scope.refreshPortfolio = refreshPortfolio;

  var loading = false;

  function isLoading() {
    return loading;
  }

  function refreshPortfolio() {
    loading = true;
    $scope.properties = [];
    $scope.errorMessgae = '';
    propertiesApi.getProperties()
      .success(function (data) {
        /*var properties = [
          {
            "pid": "00001",
            "address": "914 S Warsaw St",
            "city":"Seattle",
            "state":"WA",
            "zip":"98108",
            "propertyType": "Home",
            "units": 1,
            "teaserPhoto":"images/ISp98yfgbxdzrt0000000000.jpg",
            "activityCount":2,
            "boardCount":14,
            "purchasePrice": 125000,
            "tags": ["flip","sfr","adu"]
          },*/
        var properties = [{},{}];
        var filesURL = "http://api.buildboard.io/sites/default/files/";
        for (var i = 0; i < data.length; i++) {
          //$scope.properties[i].units = parseInt(data[i].field_units.und[0].value);
          properties[i].units = data[i].field_units.und.length;
          properties[i].propertyType = data[i].field_property_type.und[0].value;
          properties[i].purchasePrice = parseInt(data[i].field_purchase_price.und[0].value);
          properties[i].address = data[i].field_address.und[0].thoroughfare;
          properties[i].city = data[i].field_address.und[0].locality;
          properties[i].state = data[i].field_address.und[0].administrative_area;
          properties[i].zip = data[i].field_address.und[0].postal_code;
          properties[i].teaserPhoto = filesURL + 'properties/images/' + data[i].field_feature_images.und[0].filename; // TO DO change schema to field_teaser_photo, qty. 1 
        }
        $scope.properties = properties;
        $scope.propertiesUnits = propertiesUnits();
        $scope.propertiesCosts = propertiesCosts();
        loading = false;
      })
      .error(function () {
        $scope.errorMessage = "Request failed";
        loading = false;
      });
  }

  // REPORT - UNIT COUNT: Gather total unit count
  function propertiesUnits() {
    var propertiesUnits = 0;
    for (var i = 0; i < $scope.properties.length; i++) {
      propertiesUnits += $scope.properties[i].units;
    };
    return propertiesUnits;
  }

  // REPORT - COSTS COUNT:  Gather total costs
  function propertiesCosts() {
    var propertiesCosts = 0;
    for (var i = 0; i < $scope.properties.length; i++) {
      propertiesCosts += $scope.properties[i].purchasePrice;
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
    /*if (document.getElementById('photo').files[0].length) {
      var file = document.getElementById('photo').files[0];
    }
    r = new FileReader();
    r.onloadend = function(e){
      var data = e.target.result;
      //send you binary data via $http or $resource or do anything else with it
    }
    r.readAsBinaryString(f);
    
    if (file.name.length) {
      console.log('True');
      filename = file.name;
    }*/

    var filename = '';    

    var property = {
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

    $scope.properties.push(property);

    setView('propertiesList');
    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }

  // EDIT PROPERTY
  function startEditProperty(index) {
    // Get the right one
    selected = index;

    //Set the default values to the right property as an object
    this.property = {
      "address" : $scope.properties[index].address,
      "city" : $scope.properties[index].city,
      "state" : $scope.properties[index].state,
      "zip" : $scope.properties[index].zip,
      "teaserPhoto" : $scope.properties[index].teaserPhoto,
      "teaser" : $scope.properties[index].teaser,
      "propertyType": $scope.properties[index].propertyType,
      "units": $scope.properties[index].units,
      "activityCount": $scope.properties[index].activityCount,
      "purchasePrice": $scope.properties[index].purchasePrice,
      "boardCount": $scope.properties[index].boardCount,
      "tags": $scope.properties[index].tags,
    }
    // Assign to scope so accessible
    $scope.property = this.property;
    setView('editProperty');
    initializeForm();
  }

  function saveProperty() {
    $scope.properties[selected] = {
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
    }
    setView('propertiesList');
    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }

  // REMOVE PROPERTY
  function startRemoveProperty(index) {
    selected = index;
    setView('removeProperty');
    $scope.removalProperty = properties[selected];
  }

  function removeProperty() {
    $scope.properties.splice(selected,1);
    setView('propertiesList');
    $scope.propertiesUnits = propertiesUnits();
    $scope.propertiesCosts = propertiesCosts();
  }
}

var properties2 = [
  {
    "pid": "00001",
    "address": "914 S Warsaw St",
    "city":"Seattle",
    "state":"WA",
    "zip":"98108",
    "propertyType": "Home",
    "units": 1,
    "teaserPhoto":"images/ISp98yfgbxdzrt0000000000.jpg",
    "activityCount":2,
    "boardCount":14,
    "purchasePrice": 125000,
    "tags": ["flip","sfr","adu"]
  },
  {
    "pid": "00002",
    "address": "2363 S State St",
    "city":"Tacoma",
    "state":"WA",
    "zip":"98406",
    "teaserPhoto":"images/IS9xrkre05x2181000000000.jpg",
    "propertyType": "Home",
    "units": 1,
    "activityCount":5,
    "boardCount":3,
    "purchasePrice": 40000,
    "tags": ["new construction","sfr"]    
  },
  {
    "pid": "00003",
    "address": "18 Jade Cir",
    "city":"Las Vegas",
    "state":"NV",
    "zip":"89106",
    "propertyType": "Home",
    "units": 1,
    "teaserPhoto":"images/ISl2oiz4ycwl310000000000.jpg",
    "activityCount":22,
    "boardCount":0,
    "purchasePrice": 121000,
    "tags": ["rental","sfr","pool"]    
  }];

// Create API service function
function propertiesApi($http, apiUrl) {
  // Return object with getProperties function
  return {
    getProperties: function () {
      var url = apiUrl + '/properties/v1/node'
      // return properties;
      return $http.get(url);
    }
  }
}