'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
function addPropertyCtrl(zillowZervice, $state, drupal, NgMap, preloader, messages, alert, centerOfAmerica) { 

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
    preloader.setState(true);
    
    //Setup our vars.
    var
    address = '',
    city = '',
    state = '',
    zip = '';

    var
    searchData = {},
    detailsData = {};

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
      console.log('Location', location);
    }
    
    // Make Zillow call for data
    zillowZervice.getProperty(location).success(function(data) {
      // Turn to JSON object
      searchData = $.xml2json(data);
      property.result = searchData.response.results.result;
      console.log(searchData);

      //Setup request for deeper details.
      var req = {
        zpid: property.result.zpid,
        requestType: 'details'
      };
      zillowZervice.getProperty(req).success(function(data) {
        detailsData = $.xml2json(data);
        property.details = detailsData.response;
        property.details.price.number = parseFloat(property.details.price.text);
        console.log(detailsData);
        console.log('# of Images', property.details.images.count);
      });
    }).then(
      function() {
        preloader.setState(false);
        $state.go('add.property.confirm');
      }
    );
  }

  function setRelationship() {
    $state.go('add.property.relationship'); 
  }

  function addProperty() {
/*    //Some behind the scenes defining of the title.
    var title = this.property.address + " " + this.property.city + ", " + this.property.state + " " + this.property.zip;

    //Setup the property to be posted.
    var node = {
      "title": title,
      "type": "property",
      "language": "und",
      "field_address": {
        "und": [
          {
            "country":"US",
            "administrative_area": this.property.state,
            "sub_administrative_area": null,
            "locality": this.property.city,
            "dependent_locality":"",
            "postal_code": this.property.zip,
            "thoroughfare": this.property.address,
            "premise": "",
            "sub_premise": null,
            "organisation_name": null,
            "name_line": null,
            "first_name": null,
            "last_name": null,
            "data": null
          }
        ]
      }/*,
       TO DO - Property Types
      "field_property_type": {
        "und": [
          {
            "value":this.property.propertyType
          }
        ]
      },
      "field_purchase_price": {
        "und": [
          {
              "value": parseInt(this.property.purchasePrice),
              "target_id": "240"
          },
        ]
      }*/  
    //};

    //Save node.
    /*drupal.node_save(node).then(
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

  property.centerOfAmerica = centerOfAmerica;
  property.placeChanged = placeChanged;
  property.confirmProperty = confirmProperty;
  property.setRelationship = setRelationship;
  property.addProperty = addProperty;
  property.cancelAddProperty = cancelAddProperty;
}

angular.module('buildboardApp')
  .controller('AddPropertyCtrl', addPropertyCtrl);