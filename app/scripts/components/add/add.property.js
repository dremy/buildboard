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

  // TO DO - Use let.
  var property = this;
  var location = {
    address: '',
    city: '',
    state: '',
    zip: ''
  }

  // TO DO - Import const RELATIONSHIP_STATUSES and assign.
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

  function buildLocation(addressComponents = {}) {
    if (addressComponents) {
      //Setup our vars.
      var location, streetNumber, route, address, city, state, zip, requestType;
      // For each component, check for each...
      for (let i = 0; i < addressComponents.length; i++) {
        switch (addressComponents[i].types[0]) { 
          case 'street_number':
            streetNumber = addressComponents[i].long_name;
          break;
          case 'route':
            route = addressComponents[i].short_name;
          break;
          case 'locality':
            city = addressComponents[i].long_name;
          break;
          case 'administrative_area_level_1':
            state = addressComponents[i].short_name;
          break;
          case 'postal_code':
            zip = addressComponents[i].long_name;
          break;
        }
      }

      // Setup address & request type.
      address = `${streetNumber} ${route}`;
      requestType = 'address';

      // Setup location object.
      location = {
        requestType,
        address,
        city,
        state,
        zip
      };

    // Return setup location  
    return location;
    }
  }

  function confirmProperty() {
    let location = buildLocation(property.place.address_components);
    
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
      alert.message = `Congratulations! ${data.title} is created!`;
      alert.type = 'success';
      messages.add(alert.message, alert.type, alert.dt);
      property.info._id = data._id;
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
            value: property.relationship.status,
            updatedAt: Date.now()
          };
        break;
        case 'Own':
          relationship.status.own = {
            value: property.relationship.status,
            updatedAt: Date.now()
          };
        break;
        case 'Sold':
          relationship.status.sold = {
            value: property.relationship.status,
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

  property.placeChanged = placeChanged;
  property.confirmProperty = confirmProperty;
  property.addRelationship = addRelationship;
  property.addProperty = addProperty;
  property.cancelAddProperty = cancelAddProperty;
}

angular.module('buildboardApp')
  .controller('AddPropertyCtrl', addPropertyCtrl);
