'use strict';

/**
 * @ngdoc overview
 * @name bb.user
 * @description
 * # bb.user
 *
 * The user module of the application.
 *
 * Epic Fails include:
 * - Component Routing
 * - New modules for user, property, proposals
 * - New servies for messages.
 * - Property Edit State is failing due to some weird field types
 * 
 */
angular.module('bb.map', ['ngMap'])  
  .constant('centerOfAmerica', {
    lat: 39.500,
    lng: -98.350
  });