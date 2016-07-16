'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # RegisterCtrl
 * Controller of the buildboardApp
 */
function registerCtrl($rootScope, $scope, $location, drupal) {

  // Define Functions
  //------------------------------------
  // Alert - TO DO pass in as service
  function alerting(message, type) {
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });
    $rootScope.globals.isLoading = false; 
  }

  // Registration Submit
  function submit(account) {   
    account.name = account.mail; // Set username to e-mail address
    $rootScope.globals.isLoading = true; // Start the loading flag
    drupal.user_register(account).then(
      // Success - Post account
      function(data) {
        console.log(data);
        // If successful, with a returned uid.
        if (data.uid) {
          //Then login.
          drupal.user_login(account.mail, account.pass).then( 
            function(data) { //Authentication was successful.
              if (data.user.uid) {
                $rootScope.globals.currentUser = data.user;
                var message = 'Hello ' + data.user.name;
                var type = 'success';
                alerting(message, type);
                $location.path('/app'); // Redirect to home page once logged in.
              }
            }, function(reason) { // ERROR - Authentication not successful.
              var message = reason.statusText;
              var type = 'danger';
              alerting(message, type);
            }
          );
        }
      }, function(reason) { // ERROR - Registration not successful.
        var message = reason.statusText;
        var type = 'danger';
        alerting(message, type);
      });
  }

  //Initialize variables.
  //------------------------------------

  //Perform on load.
  //------------------------------------

  //Register functions to $scope.
  //------------------------------------
  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('RegisterCtrl', registerCtrl);