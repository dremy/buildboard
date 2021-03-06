'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.factory:propertiesApi
 * @description
 * # propertiesApi
 * Controller of the buildboardApp
 */

// Create API service function
function propertiesApi($http, propertyApiUrl) {

  function get(param) {
    return request("GET", param);
  }

  function post(data) {
    return request("POST", null, data);
  }

  function put(data) {
    var param = data.nid;
    return request("PUT", param, data);
  }

  function del(param) {
    return request("DELETE", param);
  }

  function request(verb, param, data) {
    var req = {
      method: verb,
      url: url(param),
      data: data
    };
    return $http(req);
  }

  function url(param) {
    if (param === null || !angular.isDefined(param)) {
      param = '';
    }
    return propertyApiUrl + param;
  }

  // Return object with getProperties function
  return {
    getProperties: function () {
      //2var url = bbPropertyApiUrl + param
      //1 return properties;
      //2return $http.get(url);
      var propParam = '?parameters[type]=property';
      return get(propParam);
    },
    getPropertiesById: function (id) {
      return get(id);
    },
    addProperty: function (property) {
      return post(property);
    },
    removeProperty: function (id) {
      return del(id);
    },
    updateProperty: function (property) {
      return put(property);
    }
  };
}

/*
// Queue up the zApi on key up
// var address = "&address=" + this.property.address;
// var citystatezip = "&citystatezip" + this.property.city + "%2C+" + this.property.state + "%20" this.property.zip;
 
function zApi($http, zSearchApiUrl, zWebServicesId) {
  // Set empty response object
  var zResponse = {};
  
  // TO DO
  return {
    getZillowSearchResponse: function() {
      $http.get(zSearchApiUrl + zWebServicesId + address + citystatezip);
    }
  };
}*/

angular.module('buildboardApp')
  .factory('propertiesApi', propertiesApi)
  .constant('propertyApiUrl','http://api.buildboard.io/v1/api/entity_node/'); // Register new service
  //.factory('zApi', zApi)
  //.constant('zSearchApiUrl','http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz19u0t23l4i3_a6mew&address=914+Warsaw+St&citystatezip=Seattle%2C+WA')
  //.constant('zWebServicesId','X1-ZWz19u0t23l4i3_a6mew')
