'use strict';

/**
 * @ngdoc function
 * @name bb.user.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bb.user module
 */
function userCtrl(
  // Scopes
  $rootScope,
  // Route
  $state,
  // Custom Services
  store,
  messages,
  preloader,
  auth,
  // Constants
  googleMapsUrl,
  centerOfAmerica,
  // Values
  alert) {

  //Initialize variables.
  //------------------------------------
  //Pull uid from path.
  var user = this;
  // Define Functions
  //------------------------------------
  //Perform on load.
  //------------------------------------
  user.profile = store.get('profile');
  
  //Register functions to $scope.
  //------------------------------------
  this.centerOfAmerica = centerOfAmerica;
  this.googleMapsUrl = googleMapsUrl;
}

angular.module('bb.user', [
  'ngMap',
  //'angular-drupal',
  'bb.alert',
  'bb.preloader'])
  .controller('UserCtrl', userCtrl);