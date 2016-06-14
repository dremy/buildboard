'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the buildboardApp
 */
function AdminCtrl($scope, $rootScope, $location, currentSpot, drupal) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $rootScope.globals = {};   //Set globals
  $rootScope.globals.isLoading = true;   //Set preloader
  $scope.message = ''; // Set empty message
 
  //Check if already authenticated
  drupal.connect().then(function(data) {
    if (data.user.uid) { //Authenticated.
      $rootScope.globals.currentUser = data.user;
      $scope.currentUser = data.user; 
      $scope.message = 'Hello ' + data.user.name + '!'; 
      // data.user.uid
      // data.sessid
      // data.session_name
    } else { // Please login.
    }
    $rootScope.globals.isLoading = false;
  });

  function isActive(menuId) {
    return currentSpot.getActiveMenu() === menuId;
  }

  function getTitle() {
    return currentSpot.getTitle();
  }

  function isLoggedIn() {
    if($rootScope.globals.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  function isLoading() {
    if($rootScope.globals.isLoading === true) {
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    $rootScope.globals.isLoading = true;
    drupal.user_logout().then(function(data) {
      if (!data.user.uid) {
        alert('You have been logged out.');
        $rootScope.globals = {};
        $location.path('/app');
        $scope.message = 'You have been logged out.';
      }
    });
  }

  // Register the functions.
  $scope.isActive = isActive;
  $scope.getTitle = getTitle;
  $scope.isLoggedIn = isLoggedIn;
  $scope.isLoading = isLoading;
  $scope.logout = logout;
}

angular.module('buildboardApp')
  .controller('AdminCtrl', AdminCtrl);
