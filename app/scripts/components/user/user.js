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
  // Route
  $state,
  // Custom Services
  messages,
  preloader,
  userService,
  account,
  // Constants
  googleMapsUrl,
  centerOfAmerica,
  // Values
  currentUser,  
  alert) {

  //Initialize variables.
  //------------------------------------
  //Pull uid from path.
  var user = this;
  // Define Functions
  //------------------------------------
  //Perform on load.
  //------------------------------------
  if (typeof account === 'object') {
    
    //Set users details.
    user.account = account;
    // If there is not an account picture, then use default.
    if (!account.picture) {
      account.picture = {
        url: 'images/avatar_silhouette.png'
      };
    }

    // If there isn't a first and last name, use user name.
    account.fullName = '';
    account.fullName = account.field_full_name.und ? account.field_full_name.und[0].given + ' ' + account.field_full_name.und[0].family : account.name;

    var location = account.field_user_location.und;
    if (location) {
      user.location = {
        city: location[0].locality,
        state: location[0].administrative_area
      };
    }
  } else {
    alert.message = "Can't pull user account details. Refresh the page to try again.";
    alert.type = 'danger';
    messages.add(alert.message, alert.type, alert.dt);
  }
  
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