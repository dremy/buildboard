'use strict';

/**
 * @ngdoc function
 * @name bb.relationship.service:relationshipService
 * @description
 * # relationshipService
 * Controller of the bb.property app
 */
function relationshipService($http, relationshipEndpointUrl, messages, preloader, alert) {
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

  function del(data) {
    var param = data._id;
    return request("DELETE", param, data);
  }

  function query(filter) {
    return request("POST", 'query', filter);
  }

  function queryProps(filter) {
    return request("POST", 'properties', filter);
  }

  function queryEvents(filter) {
    return request("POST", 'events', filter);
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
    return relationshipEndpointUrl + param;
  }

  relationshipService.getRelationships = function() {
    return get();
  }

  relationshipService.getRelationshipById = function(id) {
    return get(id);
  };

  relationshipService.updateRelationship = function(param) {
    return put(param);
  };

  relationshipService.addRelationship = function(relationship) {
    return post(relationship);
  }

  relationshipService.removeRelationship = function(id) {
    return del(id);
  }

  relationshipService.queryRelationships = function(filter) {
    return query(filter);
  }

  relationshipService.queryRelationshipsProperties = function(filter) {
    return queryProps(filter);
  }

  relationshipService.queryRelationshipsEvents = function(filter) {
    return queryEvents(filter);
  }

  return relationshipService;
}

angular.module('bb.property')
  .factory('relationshipService', relationshipService)
  .constant('relationshipEndpointUrl', location.origin + '/api/relationships/');