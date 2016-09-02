'use strict';

function authCtrl($state, $rootScope, auth, store, preloader) {

  //Initialize variables.
  //------------------------------------
  var check = this;
  check.profile = {};

  //Register functions to $scope.
  //------------------------------------
  check.auth = auth;
  $rootScope.$on('auth0.authenticated', function(e) {
    check.profile = auth.profile;
    console.log('Check.profile', check.profile);
    preloader.setState(false);
  });
}

angular.module('bb.user')
  .controller('authCtrl', authCtrl);