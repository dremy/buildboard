'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:mainMenu
 * @description
 * # Main Menu Component
 * Controller of the buildboardApp
 */
function mainMenuCtrl($state, auth, store, messages, alert) {
  // Define Functions
  //------------------------------------  
  function logOut() {
    // Log out.
    auth.signout();
    store.remove('profile');
    store.remove('token');
    // Show message.
    alert.message = `You have been successfully logged out.`
    messages.add(alert.message, alert.type.success);
    // Go to login page.
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