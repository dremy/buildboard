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

  $rootScope.globals = { //Set globals
    isLoading: true, //Set preloader
  };
  $scope.alerts = [];

  // Alerts
  function alertPush(message, type, dt) {// TO DO - Global solve.
    $scope.alerts.push({ // Emit message.
      message: message,
      type: type,
      dt: dt
    });
    $rootScope.globals.isLoading = false;
  }

  //Awaiting alerts from lower controllers.
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
  drupal.connect().then(function(data) { //Authenticated.
    if (data.user.uid > 0) { //Authenticated validation.
      drupal.user_load(data.user.uid).then(function(account) {
        //Setup current user to the view.
        $rootScope.globals.currentUser = {
          uid: account.uid,
          mail: account.mail,
          roles: account.roles
        };

        //Setup first name. If empty, use username.
        $rootScope.globals.currentUser.name = account.field_full_name.und ? account.field_full_name.und[0] : {given: data.user.name};
        $rootScope.globals.currentUser.picture = account.picture ? account.picture : {url: '/app/images/avatar_silhouette.png'};
        //Message on Page Load if Authenticated
        var message = 'Hello ' + currentUser.name.given + '!';
        var type = 'success';
        var dt = 2000;
        alertPush(message, type, dt);
      }, function(reason) {
        var message = 'Having an issue pulling user account details. Try again soon.';
        var type = 'warning';
        var dt = 2000;
        alertPush(message,type);
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
        $rootScope.globals = {};
        var message = 'You have been logged out.';
        var type = 'success';
        var dt = 2000;
        alertPush(message, type, dt);
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
