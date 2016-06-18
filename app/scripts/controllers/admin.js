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
 
  $scope.$on('alert', function(event, args) {
    $scope.alerts.push({
      message: args.message,
      type: args.type,
      dt: args.dt
    });
  });

  $scope.alerts = [];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  //Check if already authenticated
  drupal.connect().then(function(data) {
    if (data.user.uid) { //Authenticated.
      $rootScope.globals.currentUser = data.user;
      $scope.currentUser = data.user; 
      // data.user.uid
      // data.sessid
      // data.session_name
    } else { // Please login.
    }
    if(data.user.name) {
      $scope.alerts.push({
        message: 'Hello ' + data.user.name + '!',
        type: 'success',
        dt: 2000
      });
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
        $scope.alerts.push({message: 'You have been logged out.', type: 'success'});
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
