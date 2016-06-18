'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # LoginCtrl
 * Controller of the buildboardApp
 */
function loginCtrl($rootScope, $scope, $location, drupal) {

  function submit(user) { //Register login function.
    $rootScope.globals.isLoading = true;
    drupal.user_login(user.email, user.password).then(function(data) {
      if (data.user.uid) { // TO DO - Make sure "Not working" works.
        $rootScope.globals.currentUser = data.user;
        $rootScope.globals.isLoading = false;
        $location.path('/app'); // Redirect to home page once logged in.
      }
    }, function(reason) {
      $scope.$emit('alert', { // Emit message.
        message: "Something didn't work. " + reason.statusText,
        type: 'warning',
        //dt: 3000
      });
      $rootScope.globals.isLoading = false;
    });
  }

  $scope.message = '';
  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('LoginCtrl', loginCtrl);