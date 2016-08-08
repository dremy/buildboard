'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:portfolioCtrl
 * @description
 * # portfolioCtrl
 * Controller of the buildboardApp
 */

function portfolioCtrl($scope, propertyService, properties, NgMap, preloader, messages, alert) {

  //Initialize variables.
  //------------------------------------
  // Define Functions
  //------------------------------------
  function refreshPortfolio() {
    preloader.setState(true);
    setTimeout(function() {
      propertyService.getProperties().then(
        function(properties) { // SUCCESS - Nodes loaded.
          $scope.properties = properties.data; // Display
          $scope.propertiesCosts = propertiesCosts(properties); // Update Costs Value 
          preloader.setState(false);
        }, function(reason) { // ERROR - Nodes NOT loaded.
          console.log(reason);
          alert.message = "Why you no like me... " + reason.statusText;
          alert.type = 'warning';
          messages.add(alert.message, alert.type, alert.dt);
          preloader.setState(false);
        }
      );
    }, 2000);
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

  //Perform on load.
  //------------------------------------
  $scope.properties = properties.data;
  $scope.propertiesUnits = 0;
  $scope.propertiesCosts = 0;

  //Register functions to $scope.
  //------------------------------------
  $scope.refreshPortfolio = refreshPortfolio;
}

angular.module('buildboardApp')
  .controller('PortfolioCtrl', portfolioCtrl);