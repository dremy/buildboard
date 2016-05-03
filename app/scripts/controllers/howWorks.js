'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buildboardApp
 */
angular.module('buildboardApp')
  .controller('HowWorksCtrl', HowWorksCtrl);

function HowWorksCtrl($scope, currentSpot) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  currentSpot.setCurrentSpot('How It Works', 'How It Works');  
}
