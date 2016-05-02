'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PortfolioCtrl
 * Controller of the buildboardApp
 */
angular.module('buildboardApp')
  .controller('PortfolioCtrl', PortfolioCtrl);


function PortfolioCtrl($scope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // Set the model
  $scope.properties = properties;

  // Gather total unit count
  function propertiesUnits() {
    var propertiesUnits = 0;
    for (var i = 0; i < properties.length; i++) {
      propertiesUnits += properties[i].units;
    };
    return propertiesUnits;
  }
  // Set the total unit count
  $scope.propertiesUnits = propertiesUnits();

  // Gather total costs
  function propertiesCosts() {
    var propertiesCosts = 0;
    for (var i = 0; i < properties.length; i++) {
      propertiesCosts += properties[i].purchasePrice;
    };
    return propertiesCosts;
  }
  // Set the total unit count
  $scope.propertiesCosts = propertiesCosts();


  // Assign functions to be exposed on view event "click"
  $scope.startAddProperty = startAddProperty;
  $scope.cancelProperty = cancelProperty;
  $scope.addProperty = addProperty;
  $scope.startEditProperty = startEditProperty;
  $scope.saveProperty = saveProperty;
  $scope.startRemoveProperty = startRemoveProperty;
  $scope.removeProperty = removeProperty;

  var selected = -1;

  //Define propertiesList as the default
  setView('propertiesList');

  //Create function for setting the argument in setView to the controllers scope
  function setView(view) {
    $scope.view = view;      
  }

  function initializeForm() {
    $('textarea#teaser').characterCounter();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mmmm dth, yyyy', // April 15, 2016
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
    var property = {
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