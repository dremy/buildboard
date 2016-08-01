'use strict';

/**
 * @ngdoc function
 * @name bb.property.service:propertyService
 * @description
 * # propertyService
 * Controller of the bb.property app
 */
function propertyService($http, $state, propertyEndpointUrl, messages, preloader, alert) {
  function get(param) {
    return request("GET", param);
  }

  function post(data) {
    return request("POST", null, data);
  }

  function put(data) {
    var param = data._id;
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
    return propertyEndpointUrl + param;
  }

  propertyService.getProperties = function() {
    return get();
  }

  propertyService.getPropertyById = function(id) {
    return get(id);
  };

  propertyService.updateProperty = function(param) {
    return put(param);
  };

  propertyService.addProperty = function(property) {
    return post(property);
  }

  propertyService.removeProperty = function(id) {
    return del(id);
  }

  return userService;
}

angular.module('bb.property')
  .factory('propertyService', propertyService)
  .constant('propertyEndpointUrl', location.origin + '/api/property');