'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buildboardApp
 */
angular.module('buildboardApp')
  .controller('BenefitsCtrl', BenefitsCtrl);

function BenefitsCtrl($scope, currentSpot) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  currentSpot.setCurrentSpot('Benefits', 'Benefits');  
}
