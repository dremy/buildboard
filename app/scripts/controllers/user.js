'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the buildboardApp
 */
function UserCtrl($rootScope, $scope, $routeParams, drupal, NgMap, googleMapsUrl) {

  //Initialize variables.
  //------------------------------------
  var centerOfAmerica = {
    lat: 39.500,
    lng: -98.350
  };

  // Define Functions
  //------------------------------------
  // Alert
  function alerting(message, type, dt) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
      dt: dt
    });        
    $rootScope.globals.isLoading = false; 
  }

  // TO DO - Use UI router instead
  function setView(view) {
    $scope.view = view;
  }

  // TO DO - Use UI router instead
  function startEditUser() {
    setView('editUser'); //Show edit form.
  }

  // TO DO - Use UI router instead
  function saveUser() {
    // Store form values to account object.
    var account = $scope.user;

    // Build out name field values.
    if (account.field_full_name.und) {
      if (account.field_full_name.und[0].given || account.field_full_name.und[0].family) {
        // Set these empty.
        account.field_full_name.und[0].middle = ""; 
        account.field_full_name.und[0].generational = "";
        account.field_full_name.und[0].credentials = "";
        // Set these in the safe field value.
        account.field_full_name.und[0].safe = {
          given: (!account.field_full_name.und[0].given ? "" : account.field_full_name.und[0].given), //If  empty, set empty.
          middle: "",
          family: (!account.field_full_name.und[0].family ? "" : account.field_full_name.und[0].family), //If empty, set empty.
          generational: "",
          credentials: ""
        };
      }
    }

    // Set up empty user account location values.
    account.field_user_location.und = [{
      sub_administrative_area: null,
      dependent_locality: "",
      postal_code: "",
      thoroughfare: "",
      premise: "",
      sub_premise: null,
      organisation_name: null,
      name_line: null,
      first_name: null,
      last_name: null,
      data: null
    }];

    var newPlace = $scope.place;

    if (newPlace.address_components) {
      for (var i = 0; i < newPlace.address_components.length; i++) {
        switch (newPlace.address_components[i].types[0]) {
          case 'locality':
            account.field_user_location.und[0].locality = newPlace.address_components[i].long_name;
          break;
          case 'administrative_area_level_1':
            account.field_user_location.und[0].administrative_area = newPlace.address_components[i].short_name;
          break; 
          case 'country':
            account.field_user_location.und[0].country = newPlace.address_components[i].long_name;
          break; 
        }
      }
    } else {
      account.field_user_location.und[0].locality = '';
      account.field_user_location.und[0].country = '';
      account.field_user_location.und[0].administrative_area = '';
    }

    account.field_location.und = [{
      lat: newPlace.geometry.location.lat,
      lon: newPlace.geometry.location.lng
    }];

    //Remove fullName property, before PUT.
    delete account.fullName;
    console.log('Account');
    console.log(account);
    setView('userProfile');
    
    //User save
    /*
    drupal.user_save(account).then(function(data) {

      //Alerting
      var message = 'Your account has been updated.';
      var type = 'success';
      var dt = 2000;
      alerting(message, type, dt);

      //Update view - TO DO - get rid of .fullName property
      $scope.user.fullName = account.field_full_name.und[0].given + ' ' + account.field_full_name.und[0].family;
      //Update currentUser name for user menu.
      $rootScope.globals.currentUser.name = account.field_full_name.und[0];
      //Set to Profile view.
      setView('userProfile');
    }, function(reason) {

      //Alerting
      var message = "Can't post user account update. Please try again.";
      var type = 'warning';
      var dt = 2000;
      alerting(message, type, dt);
      //Log reason.
      console.log(reason);
      //Set to Profile view.
      setView('userProfile');
    });*/
  }

  // TO DO - Use UI router instead
  //Cancel User
  function cancelUser() {
    setView('userProfile');
  }

  function placeChanged() {
    $scope.place = this.getPlace();
    $scope.map.setCenter($scope.place.geometry.location);
    console.log($scope.place);
  }

  //Perform on load.
  //------------------------------------
  //Start loading flag.
  $rootScope.globals.isLoading = true;
  //Pull uid from path.
  var uid = $routeParams.uid;
  //Load users details.
  drupal.user_load(uid).then(function(account) { //Load user profile.
    // If there is not an account picture, then use default.
    if (!account.picture) {
      account.picture = {
        url: '/app/images/avatar_silhouette.png'
      };
    }
    account.fullName = account.field_full_name.und ? account.field_full_name.und[0].given + ' ' + account.field_full_name.und[0].family : account.name;
    $scope.user = account; //Set to view.
    /*if (!user.field_locations.und) {
      $scope.map.setCenter(centerOfAmerica);
    } else {
      // TO DO search required parameter value for setCenter()
      // $scope.map.setCenter(user.field_locations.und[0]);
    }*/
    $rootScope.globals.isLoading = false; //No loading spinner.
  }, function(reason) {
    var message = "Can't pull user account details. Refresh the page to try again.";
    var type = 'danger';
    var dt = 2000; 
    alerting(message, type, dt);
    console.log(reason);
  });

  //Show user profile.
  setView('userProfile');

  NgMap.getMap().then(function(map) {
    $scope.map = map;
  }).then(function() {
    $scope.map.setCenter(centerOfAmerica);
  });

  //Register functions to $scope.
  //------------------------------------
  $scope.googleMapsUrl = googleMapsUrl;
  $scope.startEditUser = startEditUser;
  $scope.saveUser = saveUser;
  $scope.cancelUser = cancelUser;
  $scope.placeChanged = placeChanged; //Get Map.
}

angular.module('buildboardApp')
  .controller('UserCtrl', UserCtrl);