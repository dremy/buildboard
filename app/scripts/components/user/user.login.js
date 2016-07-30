'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # LoginCtrl
 * Controller of the buildboardApp
 */
function loginCtrl(userService, preloader) {

  //Initialize variables.
  //------------------------------------
  // Define Functions
  //------------------------------------

  function submit(user) { //Register login function.
    preloader.setState(true);
    userService.login(user.email, user.password);
  }

  //Register functions to $scope.
  //------------------------------------
  this.submit = submit;
}

angular.module('bb.user')
  .controller('LoginCtrl', loginCtrl);