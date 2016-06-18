'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # LoginCtrl
 * Controller of the buildboardApp
 */
function loginCtrl($rootScope, $scope, $location, drupal) {

  function alerting(message, type) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });        
    $rootScope.globals.isLoading = false; 
  }

  function submit(user) { //Register login function.
    $rootScope.globals.isLoading = true;
    drupal.user_login(user.email, user.password).then(function(data) {
      if (data.user.uid) { // TO DO - Make sure "Not working" works.
        $rootScope.globals.currentUser = data.user;
        var message = 'Welcome back ' + data.user.name + '!';
        var type = 'success';
        alerting(message, type);
        $location.path('/app'); // Redirect to home page once logged in.
      }
    }, function(reason) {
        var message = "Something didn't work. " + reason.statusText;
        var type = 'warning';
        alerting(message, type);
    });
  }

  $scope.message = '';
  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('LoginCtrl', loginCtrl);