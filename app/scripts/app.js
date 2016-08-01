'use strict';

/**
 * @ngdoc overview
 * @name buildboardApp
 * @description
 * # buildboardApp
 *
 * Main module of the application.
 */

(function(angular) {

angular
  .module('buildboardApp', [
    // Route
    'ui.router',
    // Theme
    'ui.bootstrap',
    'ui.materialize',
    // Ng Config
    'angular-storage',
    'angular-jwt',
    // Services
    'angular-zillow',
    'angular-filepicker',
    'angularMoment',
    'ngMap',
    'auth0',
    //Custom modules
    'bb.alert',
    'bb.preloader',
    'bb.property',
    'bb.user'
    // NOT READY - 'bb.message'
  ])
  // Constants
  //-----------------------------
  .constant('googleMapsUrl','https://maps.googleapis.com/maps/api/js?libraries=placeses,places&key=AIzaSyD3fFcIkaR45zB5_H296gkHJ__RwX_zrBo')
  .constant('centerOfAmerica', {
    lat: parseFloat(39.500),
    lng: parseFloat(-98.350)
  })
  // Directives
  //-----------------------------
  // Allows you to format a text input field.
  // <input type="text" ng-model="test" format="number" />
  // <input type="text" ng-model="test" format="currency" />
  .directive('format', ['$filter', function ($filter) {
      return {
          require: '?ngModel',
          link: function (scope, elem, attrs, ctrl) {
              if (!ctrl) {
                return;
              }

              ctrl.$formatters.unshift(function () {
                  return $filter(attrs.format)(ctrl.$modelValue);
              });

              elem.bind('blur', function() {
                  var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                  elem.val($filter(attrs.format)(plainNumber));
              });
          }
      };
  }]);
})(angular);