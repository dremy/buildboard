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

  //Register functions to $scope.
  //------------------------------------
  $scope.refreshPortfolio = refreshPortfolio;
  
  //Perform on load.
  //------------------------------------
  $scope.properties = properties.data;
  $scope.relationshipStatuses = ["Interested", "Own", "Sold"];
  $scope.useCodes = [
    {
      key: "SingleFamily",
      value: "House"
    },
    {
      key: "VacantResidentialLand",
      value: "Land"
    },
    {
      key: "",
      value: "Multi-Family"
    }];
}

angular.module('buildboardApp')
  .controller('PortfolioCtrl', portfolioCtrl)
  .filter('sumOfValue', function () {
    return function (data, key) {        
      if (angular.isUndefined(data) && angular.isUndefined(key))
          return 0;        
      var sum = 0;        
      angular.forEach(data,function(value){
          sum = sum + parseInt(value[key]);
      });     
      return sum;
    }
  })
  .filter('sumOfPropertyAmount', function () {
    return function (data, key) {        
      if (angular.isUndefined(data) && angular.isUndefined(key))
          return 0;        
      var sum = 0;        
      angular.forEach(data,function(value, key){
          if(value._property.zestimate) sum = sum + parseInt(value._property.zestimate.amount);
      });     
      return sum;
    }
  })
  .filter('sumOfArea', function () {
    return function (data, key) {        
      if (angular.isUndefined(data) && angular.isUndefined(key))
          return 0;        
      var sum = 0;        
      angular.forEach(data,function(value, key){
          if(value._property.finishedSqFt) sum = sum + parseInt(value._property.finishedSqFt);
      });     
      return sum;
    }
  })
  .filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {        
      if (angular.isUndefined(data) && angular.isUndefined(key1)  && angular.isUndefined(key2)) 
          return 0;        
      var sum = 0;
      angular.forEach(data,function(value){
          sum = sum + (parseInt(value[key1]) * parseInt(value[key2]));
      });
      return sum;
    }
  });