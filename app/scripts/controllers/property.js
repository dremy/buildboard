'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function propertyCtrl($scope, $rootScope, $routeParams, drupal) { 

  $rootScope.globals.isLoading = true;

  var nid = $routeParams.nid;

  console.log(nid);
  // Load node clicked
  drupal.node_load(nid).then(function(node) {
      // Assign to scope
      $scope.property = node;
      console.log($scope.property);
      $rootScope.globals.isLoading = false;
  }, function(reason) {
    //console.log('Adding failed due to ' + reason.status + reason.statusText + '. Try again later.');
    $rootScope.globals.isLoading = false;
  });
}

angular.module('buildboardApp')
  .controller('PropertyCtrl', propertyCtrl);
