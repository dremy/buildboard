'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function addPropertyCtrl(zillowZervice, propertyMaker, propertyService, $state, NgMap, preloader, messages, alert, auth) { 

  // Initialize variables.
  //-------------------------------
  var property = this;
  var location = {
    address: '',
    city: '',
    state: '',
    zip: ''
  }
  // Define functions.
  //-------------------------------
  function placeChanged() {
    property.place = this.getPlace();
    property.map.setCenter(property.place.geometry.location);
    property.markers = [];
    property.markers.push({pos:[property.place.geometry.location.lat(), property.place.geometry.location.lng()]})
  }

  function cancelAddProperty() {
    $state.go('portfolio');
  }

  function confirmProperty() {
    
    //Setup our vars.
    var
    address = '',
    city = '',
    state = '',
    zip = '';

    if (property.place.address_components) {
      for (var i = 0; i < property.place.address_components.length; i++) {
        switch (property.place.address_components[i].types[0]) {
          case 'street_number':
            address += property.place.address_components[i].long_name;
          break;
          case 'route':
            address += ' ' + property.place.address_components[i].short_name;
          break;
          case 'locality':
            city = property.place.address_components[i].long_name;
          break;
          case 'administrative_area_level_1':
            state = property.place.address_components[i].short_name;
          break;
          case 'postal_code':
            zip = property.place.address_components[i].long_name;
          break;
        }
      }
      location = {
        requestType: 'address',
        address: address,
        city: city,
        state: state,
        zip: zip
      }
    }
    
    propertyMaker.addProperty(location).then(function(prop) {
      console.log(prop);
      property.info = prop;
      property.info.uid = auth.profile.user_id;
      $state.go('add.property.confirm');
    });
  }

  function setRelationship() {
    propertyService.addProperty(property.info).success(function(data) {
      console.log(data);
      alert.message = 'Congratulations! ' + property.info.title + ' is created!';
      alert.type = 'success';
      messages.add(alert.message, alert.type, alert.dt);
      // Temporary
      $state.go('portfolio');
      //$state.go('add.property.relationship');
    });
  }

  function addProperty() {
    //Save node.
    /*.....then(
      function(data) {
          message = 'Congratulations! Node ' + node.title + ' is created!';
          type = 'success';
          messages.add(message, type, dt);
          console.log(data);
          $state.go('property', {nid: data.nid});
      }, function(reason) {
        message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
        type = 'success';
        messages.add(message, type, dt);
      }
    ).then(
      function() {
        preloader.setState(false);
      }
    );*/
  }

  // Perform on load.
  //-------------------------------
  NgMap.getMap().then(function(map) {
    property.map = map;
  });

  property.placeChanged = placeChanged;
  property.confirmProperty = confirmProperty;
  property.setRelationship = setRelationship;
  property.addProperty = addProperty;
  property.cancelAddProperty = cancelAddProperty;
}

angular.module('buildboardApp')
  .controller('AddPropertyCtrl', addPropertyCtrl);
