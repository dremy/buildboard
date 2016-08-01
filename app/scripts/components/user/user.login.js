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
  var lock = new Auth0Lock('tZpbTxM4xajZMUjR804mRFNCzEMy2XA4','dremy.auth0.com');

  // Define Functions
  //------------------------------------
  function submit(user) { //Register login function.
    lock.show(function(err, profile, token, store) {
      if (err) {
        // Error callback
        console.error("Something went wrong: ", err);
      } else {
        // Success calback  

        // Save the JWT token.
        store.set('token', token);
        // Save the profile
        store.set('profile', JSON.stringify(profile));
      }
    });
    //preloader.setState(true);
  }

  //Register functions to $scope.
  //------------------------------------
  this.submit = submit;
}

angular.module('bb.user')
  .controller('LoginCtrl', loginCtrl);