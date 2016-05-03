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

function HowWorksCtrl($scope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}
