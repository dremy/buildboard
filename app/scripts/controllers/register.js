'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the buildboardApp
 */
function registerCtrl($rootScope, $scope, $location, drupal) {

  function alerting(message, type) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });        
    $rootScope.globals.isLoading = false; 
  }

  function submit(account) { //Register login function.   
    account.name = account.mail;
    $rootScope.globals.isLoading = true;
    drupal.user_register(account).then(function(data) {
      console.log(data);
      if (data.uid) { // TO DO - Make sure "Not working" works.
        drupal.user_login(account.mail, account.pass).then(function(data) { //Authentication was successful.
          if (data.user.uid) {
            $rootScope.globals.currentUser = data.user;
            var message = 'Hello ' + data.user.name;
            var type = 'success';
            alerting(message, type);
            $location.path('/app'); // Redirect to home page once logged in.
          }
        }), function(reason) { // Authentication didn't work.
          var message = reason.statusText;
          var type = 'danger';
          alerting(message, type);
        };
      }
    }, function(reason) { //Registration didn't work.
      var message = reason.statusText;
      var type = 'danger';
      alerting(message, type);
    });
  }

  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('RegisterCtrl', registerCtrl);