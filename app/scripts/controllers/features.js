'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buildboardApp
 */
angular.module('buildboardApp')
  .controller('FeaturesCtrl', FeaturesCtrl);

function FeaturesCtrl($scope, currentSpot) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  currentSpot.setCurrentSpot('Features', 'Features');
}
