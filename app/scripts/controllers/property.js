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

  //Alert.
  function alerting(message, type) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });
    $rootScope.globals.isLoading = false;
  }

  //Load node clicked.
  drupal.node_load(nid).then(function(node) {
      // Assign to scope
      $scope.property = node;
      $rootScope.globals.isLoading = false;
  }, function(reason) {

    //Alert.
    var message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    var type = 'warning';
    alerting(message, type);
  });
}

angular.module('buildboardApp')
  .controller('PropertyCtrl', propertyCtrl);
