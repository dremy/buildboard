'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the buildboardApp
 */
function adminCtrl(
  // Custom services
  currentSpot,
  currentUser,
  preloader) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  //Initialize variables.
  //------------------------------------
  function isActive(menuId) {
    return currentSpot.getActiveMenu() === menuId;
  }

  function getTitle() {
    return currentSpot.getTitle();
  }

  // Perform on load.
  //----------------------------
  preloader.setState(true);

  // Register the functions.
  this.isActive = isActive;
  this.getTitle = getTitle;
}

angular.module('buildboardApp')
  .controller('AdminCtrl', adminCtrl);
