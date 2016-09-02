'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:mainMenu
 * @description
 * # Main Menu Component
 * Controller of the buildboardApp
 */
function mainMenuCtrl($state, auth, store) {
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
  this.logOut = logOut;  
}

angular.module('buildboardApp')
  .component('mainMenu', {
    templateUrl: 'scripts/components/menus/mainMenu.html',
    controller: mainMenuCtrl,
    bindings: {
      auth: '<',
      profile: '<'
    }
  });