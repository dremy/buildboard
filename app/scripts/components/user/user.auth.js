'use strict';

function authCtrl($state, $rootScope, auth, store, preloader) {

  //Initialize variables.
  //------------------------------------
  var check = this;
  check.profile = {};
  
  // Define Functions
  //------------------------------------  
  function logOut() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $state.go('userLogin');
  }

  //Register functions to $scope.
  //------------------------------------
  check.auth = auth;  
  check.logOut = logOut;
  $rootScope.$on('auth0.authenticated', function(e) {
    console.log('Auth?', auth.profile);
    check.profile = auth.profile;
    preloader.setState(false);
  });
}

angular.module('bb.user')
  .controller('authCtrl', authCtrl);