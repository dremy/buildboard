'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the buildboardApp
 */
function registerCtrl($rootScope, $scope, $location, drupal) {

  function submit(account) { //Register login function.   
    account.name = account.mail;
    $rootScope.globals.isLoading = true;
    drupal.user_register(account).then(function(data) {
      console.log(data);
      if (data.uid) { // TO DO - Make sure "Not working" works.
        drupal.user_login(account.mail, account.pass).then(function(data) { //Authentication was successful.
          if (data.user.uid) {
            $rootScope.globals.currentUser = data.user;
            $scope.$emit('alert', { // Emit message.
              message: 'Hello ' + data.user.name,
              type: 'success',
              //dt: 3000
            });
            $rootScope.globals.isLoading = false;
            $location.path('/app'); // Redirect to home page once logged in.
          }
        }), function(reason) { // Authentication didn't work.
          $scope.$emit('alert', { // Emit message.
            message: reason.statusText,
            type: 'danger',
            //dt: 3000
          });
          $rootScope.globals.isLoading = false;
        };
      }
    }, function(reason) { //Registration didn't work.
      $scope.$emit('alert', { // Emit message.
        message: reason.statusText,
        type: 'danger',
        //dt: 3000
      });
      $rootScope.globals.isLoading = false;
    });
  }

  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('RegisterCtrl', registerCtrl);