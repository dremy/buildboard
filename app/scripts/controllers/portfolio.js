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

    var selected = -1;

    //Define propertiesList as the default
    setView('propertiesList');

    //Create function for setting the argument in setView to the controllers scope
    function setView(view) {
      $scope.view = view;      
    }

    function startAddProperty() {
      $scope.propertyAddress = '';
      $scope.propertyCityStateZip = '';
      $scope.propertyPhoto = '';      
      $scope.propertyTeaser = '';
      setView('addProperty');
    }

    function cancelProperty() {
      setView('propertiesList');
    }

    function addProperty() {
      var propertyAddress = $scope.propertyAddress;
      var propertyCityStateZip = $scope.propertyCityStateZip;
      var propertyPhoto = $scope.propertyPhoto;      
      var propertyTeaser = $scope.propertyTeaser;

      var property = {
        "title": propertyAddress,
        "subtitle": propertyCityStateZip,
        "featurePhoto": propertyPhoto,
        "teaser": propertyTeaser 
      }

      $scope.properties.push(property);
      setView('propertiesList');
    }

    function startEditProperty(index) {
      selected = index;
      $scope.propertyAddress = $scope.properties[index].title;
      $scope.propertyCityStateZip = $scope.properties[index].subtitle;
      $scope.propertyPhoto = $scope.properties[index].featurePhoto;      
      $scope.propertyTeaser = $scope.properties[index].teaser;      
      setView('editProperty');
    }

    function saveProperty() {
      $scope.properties[selected].title = $scope.propertyAddress;
      $scope.properties[selected].subtitle = $scope.propertyCityStateZip;
      $scope.properties[selected].featurePhoto = $scope.propertyPhoto;
      $scope.properties[selected].teaser = $scope.propertyTeaser;
      setView('propertiesList');
      console.log("save");
    }
  }

/*  function PortfolioCtrl($scope) {
    //var index = 0; // Set index to beginning
    console.log('Hello');
    //$scope.properties = properties; // Set properties to empty array;
    //console.log($scope.properties);
  }*/