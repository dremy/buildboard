'use strict';

/**
 * @ngdoc function
 * @name bb.user.service:userService
 * @description
 * # userService
 * Controller of the bb.user app
 */
function userService($http, $state, auth, store, userEndpointUrl, messages, preloader, alert) {

  function get(param) {
    return request("GET", param);
  }

  function patch(data) {
    var profile = {};
    profile = store.get('profile');
    var param = profile.user_id;
    return request("PATCH", param, data);
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
    return userEndpointUrl + param;
  }

  userService.getUser = function(param) {
    return get(param);
  };

  userService.patchUser = function(param) {
    return patch(param);
  };

  return userService;
}

angular.module('bb.user')
  .factory('userService', userService)
  .constant('userEndpointUrl', 'https://dremy.auth0.com/api/v2/users/');