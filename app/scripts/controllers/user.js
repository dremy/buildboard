'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the buildboardApp
 */
function userCtrl($rootScope, $scope, $routeParams, drupal) {

  //ALERT
  function alerting(message, type) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
    });        
    $rootScope.globals.isLoading = false; 
  }

  // Create function for setting the argument in setView to the controllers scope
  function setView(view) {
    $scope.view = view;
  }

  // Setup the Form
  function initializeForm() {
    $('textarea#teaser').characterCounter();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mmmm d, yyyy', // April 15, 2016
    });
    $('select').material_select();
  }

  function startEditUser() {
    setView('editUser'); //Show edit form.
    initializeForm(); //Initialize the form.
  }

  function saveUser() {
    var account = $scope.user;
    if (account.field_full_name.und[0].given || account.field_full_name.und[0].family) {
      account.field_full_name.und[0].middle = ""; 
      account.field_full_name.und[0].generational = "";
      account.field_full_name.und[0].credentials = "";
      account.field_full_name.und[0].safe = {
        given: account.field_full_name.und[0].given,
        middle: "",
        family: account.field_full_name.und[0].family,
        generational: "",
        credentials: ""
      };
    }
    console.log(account);
   drupal.user_save(account).then(function(data) {

      //Alerting
      var message = 'Your account has been updated.';
      var type = 'success';
      var dt = 2000;
      alerting(message, type, dt);
    }, function(reason) {

      //Alerting
      var message = "Can't post user account update. Please try again.";
      var type = 'warning';
      var dt = 2000;
      alerting(message, type, dt);
    });

    setView('userProfile');
  }

  function cancelUser() {
    setView('userProfile');
  }

  $rootScope.globals.isLoading = true;
  var uid = $routeParams.uid;

  drupal.user_load(uid).then(function(account) {
    if (account.picture === null) {
      account.picture = {
        url: '/app/images/avatar_silhouette.png'
      };
    }
    if (account.field_full_name.und) {
      account.fullName = account.field_full_name.und[0].given + ' ' + account.field_full_name.und[0].family;
    } else {
      account.fullName = account.name;
    }
    $scope.user = account; //Set to view.
    $rootScope.globals.isLoading = false; //No loading spinner.
  }, function(reason) {
    //Alerting.
    var message = "Can't pull user account details. <strong>Refresh the page</strong> to try again.";
    var type = 'danger';
    alerting(message, type);
  });

  //Show user profile.
  setView('userProfile');

  //Register functions to $scope; Exposed on view event "click".
  $scope.startEditUser = startEditUser;
  $scope.saveUser = saveUser;
  $scope.cancelUser = cancelUser;
}

angular.module('buildboardApp')
  .controller('UserCtrl', userCtrl);