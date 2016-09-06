'use strict';

/**
 * @ngdoc function
 * @name bb.event.service:eventService
 * @description
 * # eventService
 * Controller of the bb.event app
 */
function eventService($http, eventEndpointUrl, messages, preloader, alert) {
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
    return eventEndpointUrl + param;
  }

  eventService.getEvents = function() {
    return get();
  }

  eventService.getEventById = function(id) {
    return get(id);
  };

  eventService.updateEvent = function(param) {
    return put(param);
  };

  eventService.addEvent = function(Event) {
    return post(Event);
  }

  eventService.removeEvent = function(id) {
    return del(id);
  }

  eventService.queryEvents = function(filter) {
    return query(filter);
  }

  eventService.queryEventsProperties = function(filter) {
    return queryProps(filter);
  }

  return eventService;
}

angular.module('bb.event')
  .factory('eventService', eventService)
  .constant('eventEndpointUrl', location.origin + '/api/events/');