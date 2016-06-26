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
      if (data.user.uid) {
        drupal.user_load(data.user.uid).then(function(account) {
          //Setup current user to the view.
          currentUser = {
            uid: account.uid,
            mail: account.mail,
            roles: account.roles
          };
          if (account.field_full_name.und) {
            currentUser.name = account.field_full_name.und[0];
          } else {
            currentUser.name = {
              given: data.user.name
            };
          }
          if (!account.picture) {
            currentUser.picture = {
              url: '/app/images/avatar_silhouette.png'
            };
          } else {
            currentUser.picture = account.picture;
          }
          //Set current user to the view.
          $rootScope.globals.currentUser = currentUser;

          //Redirect to user profile on log in.
          $location.url('user/' + currentUser.uid);

          // Alert a greeting!
          if (currentUser.name.given) { // Show their first name, if its been set.
            var message = 'Welcome back ' + currentUser.name.given + '!';
          } else { // Show their user name, if first name has not been set.
            var message = 'Welcome back ' + data.user.name + '!';
          }
          var type = 'success';
          alerting(message, type);

        }, function(reason) { // ERROR
          var message = "Can't pull user account details. <strong>Refresh the page</strong> to try again.";
          var type = 'danger';
          alerting(message, type);
        });
      }
    }, function(reason) { //ERROR
        var message = "Something didn't work. " + reason.statusText;
        var type = 'warning';
        alerting(message, type);
    });
  }

  var currentUser = {}; //Clear current user variable on login.
  $scope.submit = submit;
}

angular.module('buildboardApp')
  .controller('LoginCtrl', loginCtrl);