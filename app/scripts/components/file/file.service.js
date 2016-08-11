'use strict';

/**
 * @ngdoc function
 * @name bb.file.service:fileService
 * @description
 * # fileService
 * Controller of the bb.file app
 */
function fileService($http, fileEndpointUrl, messages, preloader, alert) {
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

  function queryBoard(filter) {
    return request("POST", 'board', filter);
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
    return fileEndpointUrl + param;
  }

  fileService.getFiles = function() {
    return get();
  }

  fileService.getFileById = function(id) {
    return get(id);
  };

  fileService.updateFile = function(param) {
    return put(param);
  };

  fileService.addFile = function(file) {
    return post(file);
  }

  fileService.removeFile = function(id) {
    return del(id);
  }

  fileService.queryFile = function(filter) {
    return query(filter);
  }

  fileService.queryFileBoard = function(filter) {
    return queryBoard(filter);
  }

  return fileService;
}

angular.module('bb.file')
  .factory('fileService', fileService)
  .constant('fileEndpointUrl', location.origin + '/api/files/');