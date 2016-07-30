'use strict';

/**
 * @ngdoc function
 * @name bb.user.controller:loggedInCtrl
 * @description
 * # loggedInCtrl
 * Controller of the bb.user app
 */
function userService($state, messages, preloader, currentUser, alert) {

  // TEMPORARY
  var drupal;
  // currentUser Setup
  function accountSetup(account) {
    currentUser = account;
    // - First name. If empty, use username.
    currentUser.name = account.field_full_name.und ? account.field_full_name.und[0] : {given: account.name};
    // - User picture. If empty, use default.
    if (!account.picture) {
      currentUser.picture = {url: 'images/avatar_silhouette.png'};
    }
  }
  
  userService.isLoggedIn = function() {
    if (parseInt(currentUser.uid) > 0) {
      return true;
    } else {
      return false;
    }
  }

  userService.logOut = function() {
    preloader.setState(true);
    drupal.user_logout().then(function(data) {
      if (!data.user.uid) {
        currentUser = {
          uid: 0,
          roles: {},
          picture: {
            url: 'images/avatar_silhouette.png'
          },
          name: '',
          mail: '',
          full_name: ''
        };
        alert.message = 'You have been logged out.';
        alert.type = 'success';
        messages.add(alert.message, alert.type, alert.dt);
      }
    }).then(
      function(){
        $state.go('home');
        preloader.setState(false);
      }
    );
  }

  userService.register = function(account) {
    preloader.setState(true);
    account.name = account.mail;
    drupal.user_register(account).then(
      function(data) { // Success - Post account
        // If successful, with a returned uid.
        if (data.uid) {
          //Then login.
          alert.message = 'Registration successful. You are now logged in.';
          userService.login(account.mail, account.pass, alert.message);
        }
      }, function(reason) { // ERROR - Registration not successful.
        alert.message = reason.statusText;
        alert.type = 'danger';
        messages.add(alert.message, alert.type, alert.dt);
      }
    ).then(
      function() {
        preloader.setState(false);
      }
    );
  }

  userService.save = function(account) {
    preloader.setState(true);
    drupal.user_save(account).then(
      function() {

      }
    ).then(
      function() {
        preloader.setState(false);        
      }
    ); 
  }

  userService.login = function(email, password, message) {
    preloader.setState(true);   
    drupal.user_login(email, password).then(
      function(data) { // SUCCESS - User logged in.
        if (data.user.uid > 0) {
          drupal.user_load(data.user.uid).then( 
            function(account) { // SUCCESS - User's account loaded.
              accountSetup(account);
              // Redirect to user profile on log in.
              $state.go('account', {uid: account.uid});
              // Message a greeting!
              if (message) {
                alert.message = message;
              } else {
                alert.message = 'Welcome back ';
                alert.message += currentUser.name.given ? currentUser.name.given + '!' : data.user.name + '!';
              }
              alert.type = 'success';
              messages.add(alert.message, alert.type, alert.dt);
            }, function(reason) { // ERROR - User's account NOT loaded. 
              alert.message = "Something didn't work. " + reason.statusText;
              alert.type = 'danger';
              messages.add(alert.message, alert.type, alert.dt);
            }
          )
        }
      }, function(reason) { //ERROR - User NOT logged in.
        alert.message = "Something didn't work. " + reason.statusText;
        alert.type = 'warning';
        messages.add(alert.message, alert.type, alert.dt);
      }
    ).then(
      function() {
        preloader.setState(false);        
      }
    );    
  }

  userService.connect = function() {
    drupal.connect().then(function(data) { //Authenticated.
      if (data.user.uid > 0) { //Authenticated validation.
        drupal.user_load(data.user.uid).then(function(account) {
          accountSetup(account);
          //Message on Page Load if Authenticated
          alert.message = 'Hello ' + currentUser.name.given + '!';
          alert.type = 'success';
          messages.add(alert.message, alert.type, alert.dt);
          userService.current = currentUser;
          console.log(userService.current);

        }, function(reason) {
          alert.message = "Something didn't work. " + reason.statusText;
          alert.type = 'warning';
          messages.add(alert.message, alert.type, alert.dt);
        });
      }
    }).then(
      function() {
        preloader.setState(false);
      } 
    );
  }

  userService.current = currentUser;
  return userService;
}

function loggedInCtrl(userService, currentUser, preloader) {
  //Connect if authenticated on page reload.
  //TEMPORARY
  //userService.connect();
  //console.log(userService.currentUser);
  this.user = userService;
  preloader.setState(false);
}

angular.module('bb.user')
  .factory('userService', userService)
  .value('currentUser', {
    uid: 0,
    roles: {},
    picture: {
      url: 'images/avatar_silhouette.png'
    },
    name: '',
    mail: '',
    full_name: ''
  })
  .controller('loggedInCtrl', loggedInCtrl);