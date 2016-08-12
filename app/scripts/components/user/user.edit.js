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
  NgMap,
  store,
  // Custom Services
  userService,
  messages,
  preloader,
  // Values
  alert,
  // Constants
  centerOfAmerica) {

  //Initialize variables.
  //------------------------------------
  //Pull uid from path.
  var uid = $state.params.uid;
  var user = this;  
  var account = {};
  // Define Functions
  //------------------------------------
  function saveUser(user_metadata) {
    preloader.setState(true);
    if (user.place) {
      var newPlace = {};
      newPlace = user.place;
      console.log(user_metadata);
      if (newPlace.address_components) {
        for (var i = 0; i < newPlace.address_components.length; i++) {
          switch (newPlace.address_components[i].types[0]) {
            case 'locality':
              user_metadata.location.city = newPlace.address_components[i].long_name;
            break;
            case 'administrative_area_level_1':
              user_metadata.location.state = newPlace.address_components[i].short_name;
            break;  
          }
        }
      }
      user_metadata.location.lat = parseFloat(newPlace.geometry.location.lat().toFixed(6));
      user_metadata.location.lng = parseFloat(newPlace.geometry.location.lng().toFixed(6));
    } else {
      // TBD.
    }
    var account = {
      user_metadata: user_metadata
    };
    //User save
    userService.patchUser(account).then(function(data) {
      console.log(data);
      store.set('profile', data.data);
      //Alerting
      alert.message = 'Your account has been updated.';
      alert.type = 'success';
      messages.add(alert.message, alert.type, alert.dt);

      // Update currentUser name for user menu.
      // TO DO - currentUser.account.name = account.field_full_name.und[0];
      //Set to Profile view.
    }, function(reason) {

      //Alerting
      alert.message = "Can't post user account update. Please try again.";
      alert.type = 'warning';
      messages.add(alert.message, alert.type, alert.dt);
      //Log reason.
      console.log(reason);
      //Set to Profile view.
    })
    .then(function() {
      preloader.setState(false);
      $state.go('account');
    });
  }
  //Cancel User
  function cancelEditUser() {
    $state.go('account');
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
      user.account.user_metadata.location.formatted = user.place.formatted_address;
    }
  }

  //Perform on load.
  //------------------------------------
  // Autofill.
  user.account = store.get('profile');
  user.inputLocation = user.account.user_metadata.location.formatted;

  //Register functions to $scope.
  //------------------------------------
  user.saveUser = saveUser;
  user.cancelEditUser = cancelEditUser;
  user.placeChanged = placeChanged;
  user.centerOfAmerica = centerOfAmerica;
}

angular.module('bb.user')
  .controller('UserEditCtrl', userEditCtrl);
