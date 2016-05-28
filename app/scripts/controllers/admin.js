'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buildboardApp
 */
function AdminCtrl($scope, currentSpot) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  function isActive(menuId) {
    return currentSpot.getActiveMenu() === menuId;
  }

  function getTitle() {
    return currentSpot.getTitle();
  }

  // Register the functions.
  $scope.isActive = isActive;
  $scope.getTitle = getTitle;  
}

angular.module('buildboardApp')
  .controller('AdminCtrl', AdminCtrl);
