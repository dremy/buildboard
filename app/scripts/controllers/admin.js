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
  $scope.alerts = [];
  var currentUser = {};

  // Alerts
  function alerting(message, type) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });
    $rootScope.globals.isLoading = false;
  }

  $scope.$on('alert', function(event, args) {
    $scope.alerts.push({
      message: args.message,
      type: args.type,
      dt: args.dt
    });
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  //Check if already authenticated
  drupal.connect().then(function(data) {
    if (data.user.uid) { //Authenticated.
      $rootScope.globals.currentUser = data.user;
      drupal.user_load(data.user.uid).then(function(account) {
        $rootScope.globals.currentUser = account;
        currentUser = {
          uid: account.uid,
          mail: account.mail,
        };
        if (account.field_full_name.und) {
          currentUser.name = account.field_full_name.und[0];
        }
        if (account.picture) {
          currentUser.picture = account.picture;
        }
        $scope.currentUser = currentUser;
        //Message on Page Load if Authenticated
        $scope.alerts.push({
          message: 'Hello ' + currentUser.name.given + '!',
          type: 'success',
          dt: 2000
        });
      }, function(reason) {
        var message = 'Having an issue pulling user account details. Try again soon.';
        var type = 'warning';
        alerting(message,type);
      });
      // data.user.uid
      // data.sessid
      // data.session_name
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
