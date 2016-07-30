'use strict';

'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the buildboardApp
 */
function userEditCtrl(
  // Route
  $state,
  // External Services
  drupal,
  NgMap,
  // Custom Services
  userService,
  messages,
  preloader,
  // Values
  alert,
  // Constants
  googleMapsUrl,
  centerOfAmerica) {

  //Initialize variables.
  //------------------------------------
  //Pull uid from path.
  var uid = $state.params.uid;
  var message = '';
  var type = '';
  var user = this;  
  // Define Functions
  //------------------------------------
  function saveUser() {
    // Store form values to account object.
    var account = this.account;

    // Build out name field values.
    if ("und" in account.field_full_name) {
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
    account.field_user_location = {
      und: [{
        locality: "",
        country: "US",
        administrative_area: "",
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
      }]
    };

    var newPlace = this.place;

    if (newPlace.address_components) {
      for (var i = 0; i < newPlace.address_components.length; i++) {
        switch (newPlace.address_components[i].types[0]) {
          case 'locality':
            account.field_user_location.und[0].locality = newPlace.address_components[i].long_name;
          break;
          case 'administrative_area_level_1':
            account.field_user_location.und[0].administrative_area = newPlace.address_components[i].short_name;
          break;  
        }
      }
    }
    account.field_latitude = {
      und: [{
        value: parseFloat(newPlace.geometry.location.lat().toFixed(6))
      }]
    };
    account.field_longitude = {
      und: [{
        value: parseFloat(newPlace.geometry.location.lng().toFixed(6)) 
      }]
    };
    //Remove fullName property, before PUT.
    delete account.fullName;

    console.log(account);
    console.log(JSON.stringify(account));
    //User save
    drupal.user_save(account).then(function(data) {
      console.log(account);
      //Alerting
      alert.message = 'Your account has been updated.';
      alert.type = 'success';
      messages.add(alert.message, alert.type, alert.dt);

      // Update currentUser name for user menu.
      // TO DO - currentUser.account.name = account.field_full_name.und[0];
      //Set to Profile view.
      $state.go('account', {uid: uid});
    }, function(reason) {

      //Alerting
      alert.message = "Can't post user account update. Please try again.";
      alert.type = 'warning';
      messages.add(alert.message, alert.type, alert.dt);
      //Log reason.
      console.log(reason);
      //Set to Profile view.
      $state.go('account', {uid: uid});
    });
  }
  //Cancel User
  function cancelEditUser() {
    $state.go('account', {uid: uid});
  }

  function placeChanged() {
    // Provide functions to scope.
    user.place = this.getPlace();

    // Gather new map position.
    if(user.place) {
      var mapPosition = {
        lat: user.place.geometry.location.lat(),
        lng: user.place.geometry.location.lng()
      };
      user.map.setCenter(mapPosition);
    }
    // Set marker.
    user.maplocation = userEdit.inputLocation;
    // Center map.
  }

  //Perform on load.
  //------------------------------------
  //Start loading flag.
  preloader.setState(true);

  //Load users details.
  drupal.user_load(uid).then(function(account) { //Load user profile.
    // If there is not an account picture, then use default.
    if (!account.picture) {
      account.picture = {
        url: 'images/avatar_silhouette.png'
      };
    }
    account.fullName = account.field_full_name.und ? account.field_full_name.und[0].given + ' ' + account.field_full_name.und[0].family : account.name;
    user.account = account;
    // Location setup.
    var location = account.field_user_location.und;
    if (location) {
      user.inputLocation = location[0].locality + ', ' + location[0].administrative_area;
      user.mapLocation = user.inputLocation;
    } else {
      user.maplocation = 'current';
      user.inputLocation = '';
    }
    console.log(user);
  }, function(reason) {
    alert.message = "Can't pull user account details. Refresh the page to try again.";
    alert.type = 'danger';
    messages.add(alert.message, alert.type, alert.dt);
    console.log(reason);
  }).then(
    function() {
      preloader.setState(false);
    }
  );

  NgMap.getMap().then(function(map) {
    user.map = map;
  });

  //Register functions to $scope.
  //------------------------------------
  user.googleMapsUrl = googleMapsUrl;
  user.saveUser = saveUser;
  user.cancelEditUser = cancelEditUser;
  user.placeChanged = placeChanged;
  user.centerOfAmerica = centerOfAmerica;
}

angular.module('bb.user')
  .controller('UserEditCtrl', userEditCtrl);
