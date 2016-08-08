'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function addPropertyCtrl(zillowZervice, propertyMaker, propertyService, relationshipService, $state, NgMap, preloader, messages, alert, auth) { 

  // Initialize variables.
  //-------------------------------
  var property = this;
  var location = {
    address: '',
    city: '',
    state: '',
    zip: ''
  }
  property.relationship = {
    statuses: ["Interested", "Own", "Sold"] //If adding property one by one, not browsing by map, assume interest.
  };
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

  function addProperty() {
    // Save property. 
    propertyService.addProperty(property.info).success(function(data) {
      console.log(data);
      alert.message = 'Congratulations! ' + data.title + ' is created!';
      alert.type = 'success';
      messages.add(alert.message, alert.type, alert.dt);
      property.info._id = data._id;
      // Temporary
      $state.go('add.property.relationship');
    });
  }

  function addRelationship() {
    // Save relationship.
    if (property.relationship.status && property.info._id) {
      var relationship = {
        _user: auth.profile.user_id,
        _property: property.info._id,
        status: {}
      };
      switch (property.relationship.status) {
        case 'Interested':
          relationship.status.interested = {
            value: true,
            updatedAt: Date.now()
          };
        break;
        case 'Own':
          relationship.status.own = {
            value: true,
            updatedAt: Date.now()
          };
        break;
        case 'Sold':
          relationship.status.sold = {
            value: true,
            updatedAt: Date.now()
          };
        break;
      }

      relationshipService
        .addRelationship(relationship)
        .success(function(data) {
          console.log('Works', data);
        })
        .error(function() {
          console.log('Doesnt work', data);
        })
        .then(function() {
          $state.go('portfolio');
        });
    }
  }

  // Perform on load.
  //-------------------------------
  NgMap.getMap().then(function(map) {
    property.map = map;
  });

  $('select').material_select();
  property.placeChanged = placeChanged;
  property.confirmProperty = confirmProperty;
  property.addRelationship = addRelationship;
  property.addProperty = addProperty;
  property.cancelAddProperty = cancelAddProperty;
}

angular.module('buildboardApp')
  .controller('AddPropertyCtrl', addPropertyCtrl);
