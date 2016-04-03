'use strict';

/**
 * @ngdoc overview
 * @name buildboardApp
 * @description
 * # buildboardApp
 *
 * Main module of the application.
 */
angular
  .module('buildboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-drupal'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/features', {
        templateUrl: 'views/features.html',
        controller: 'FeaturesCtrl',
        controllerAs: 'features'
      })
      .when('/user/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })      
      .when('/user/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/activity', {
        templateUrl: 'views/activity.html',
        controller: 'ActivityCtrl',
        controllerAs: 'activity'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['drupal', function(drupal) {
    
    drupal.node_load(1).then(function(node) {
      console.log(node.title);
    });

    /*var node = {
      type: "property",
      title: "Something new",
      language: "und",
      body: {
        und: [ { value: 'How are you?' }]
      }
    };

    drupal.node_save(node).then(function(data) {
      alert('Created node:' + data.nid);
    });*/

  }]);


// The angular-drupal configuration settings for my simple app.
angular
  .module('angular-drupal').config(function($provide) {

    $provide.value('drupalSettings', {
      sitePath: 'http://api.buildboard.io',
      endpoint: 'investment/v1'
    });

});