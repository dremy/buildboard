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
        alert('Hello ' + data.user.name + '!');
        $rootScope.globals.currentUser = data.user;
        $rootScope.globals.isLoading = false;
        console.log($rootScope);
        $location.path('/app'); // Redirect to home page once logged in.
      } else {
        console.log('Not working.');
        $rootScope.globals.isLoading = false;
      }
    }, function(reason) {
      //$scope.message = reason.status + reason.statusText;
      $rootScope.globals.isLoading = false;
    });
  }

  $scope.message = '';
  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('LoginCtrl', loginCtrl);