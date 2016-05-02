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

    // ADD PROPERTY
    function startAddProperty() {
      $scope.property = {
        "address":"",
        "city":"",
        "state":"",
        "zip":"",
        "teaserPhoto":"",
        "teaser":"",
        "type": "",
        "units": "",
        "activityCount":"",
        "boardCount":"",
        "tags": "",
      }
      setView('addProperty');

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
        "type": this.property.type,
        "units": this.property.units,
        "activityCount": this.property.activityCount,
        "boardCount": this.property.boardCount,
        "tags": this.property.tags,
      }

      $scope.properties.push(property);

      setView('propertiesList');
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
        "type": $scope.properties[index].type,
        "units": $scope.properties[index].units,
        "activityCount": $scope.properties[index].activityCount,
        "boardCount": $scope.properties[index].boardCount,
        "tags": $scope.properties[index].tags,
      }
      // Assign to scope so accessible
      $scope.property = this.property;
      setView('editProperty');
    }

    function saveProperty() {
      $scope.properties[selected] = {
        "address": this.property.address,
        "city": this.property.city,
        "state": this.property.state,
        "zip": this.property.zip,
        "teaserPhoto": this.property.teaserPhoto,
        "teaser": this.property.teaser, 
        "type": this.property.type,
        "units": this.property.units,
        "activityCount": this.property.activityCount,
        "boardCount": this.property.boardCount,
        "tags": this.property.tags,
      }
      setView('propertiesList');
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
    }
  }
