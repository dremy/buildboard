'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the buildboardApp
 */
function registerCtrl($state, drupal, userService, messages, alert, preloader) {

  // Initialize variables.
  //-------------------------------

  // Define Functions
  //-------------------------------
  // Registration Submit
  function submit(account) {
    userService.register(account);
  }

  //Perform on load.
  //------------------------------------

  //Register functions to $scope.
  //------------------------------------
  this.submit = submit;
}

angular.module('bb.user')
  .controller('RegisterCtrl', registerCtrl);