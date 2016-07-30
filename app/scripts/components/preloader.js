'use strict';

function preloaderCtrl(preloader) {

  function isLoading() {
    if(preloader.isLoading === true) {
      return true;
    } else {
      return false;
    }
  }

  this.isLoading = isLoading;
}

function preloader() {
  var preloader = {};
  preloader.setState = function(bool) {
    preloader.isLoading = bool;
  };
  return preloader;
}

angular.module('bb.preloader', [])
  .factory('preloader', preloader)
  .controller('preloaderCtrl', preloaderCtrl)
  .constant('bool', true);

