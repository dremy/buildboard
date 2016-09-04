'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:portfolioCtrl
 * @description
 * # portfolioCtrl
 * Controller of the buildboardApp
 */

function portfolioCtrl($scope, relationshipService, auth, properties, NgMap, preloader, messages, alert) {

  //Initialize variables.
  //------------------------------------
  var _user = {
    _user: auth.profile.user_id
  };
  // Define Functions
  //------------------------------------
  function refreshPortfolio() {
    preloader.setState(true);
    setTimeout(function() {
      relationshipService.queryRelationshipsProperties(_user).then(
        function(properties) { // SUCCESS - Nodes loaded.
          $scope.properties = properties.data; // Display
          $scope.propertiesCosts = propertiesCosts(properties); // Update Costs Value 
        }, function(reason) { // ERROR - Nodes NOT loaded.
          console.log(reason);
          alert.message = "Why you no like me... " + reason.statusText;
          alert.type = 'warning';
          messages.add(alert.message, alert.type, alert.dt);
        }
      )
      .then(function(){
        preloader.setState(false);
      });
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