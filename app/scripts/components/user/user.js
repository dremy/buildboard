'use strict';

/**
 * @ngdoc function
 * @name bb.user.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bb.user module
 */
function userCtrl(
  // Custom Services
  store,
  // Constants
  centerOfAmerica) {

  //Initialize variables.
  //------------------------------------
  var user = this;
  // Define Functions
  //------------------------------------
  //Perform on load.
  //------------------------------------
  user.profile = store.get('profile');
  
  //Register functions to $scope.
  //------------------------------------
  user.centerOfAmerica = centerOfAmerica;
}

angular.module('bb.user', [
  'ngMap',
  //'angular-drupal',
  'bb.alert',
  'bb.preloader'])
  .controller('UserCtrl', userCtrl);