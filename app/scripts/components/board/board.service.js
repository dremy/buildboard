'use strict';

/**
 * @ngdoc function
 * @name bb.board.service:boardService
 * @description
 * # boardService
 * Controller of the bb.board app
 */
function boardService($http, boardEndpointUrl, messages, preloader, alert) {
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

  function queryRelationship(filter) {
    return request("POST", 'relationship', filter);
  }

  function queryFiles(filter) {
    return request("POST", 'files', filter);
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
    return boardEndpointUrl + param;
  }

  boardService.getBoards = function() {
    return get();
  }

  boardService.getBoardById = function(id) {
    return get(id);
  };

  boardService.updateBoard = function(param) {
    return put(param);
  };

  boardService.addBoard = function(board) {
    return post(board);
  }

  boardService.removeBoard = function(id) {
    return del(id);
  }

  boardService.queryBoards = function(filter) {
    return query(filter);
  }

  boardService.queryBoardsRelationship = function(filter) {
    return queryRelationship(filter);
  }

  boardService.queryBoardsFiles = function(filter) {
    return queryFiles(filter);
  }

  return boardService;
}

angular.module('bb.board')
  .factory('boardService', boardService)
  .constant('boardEndpointUrl', location.origin + '/api/boards/');