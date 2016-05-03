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
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'portfolio'
      })
      .when('/property', {
        templateUrl: 'views/property.html',
        controller: 'PropertyCtrl',
        controllerAs: 'property'
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
  .factory('currentSpot', currentSpot)
  // allow you to format a text input field.
  // <input type="text" ng-model="test" format="number" />
  // <input type="text" ng-model="test" format="currency" />
  .directive('format', ['$filter', function ($filter) {
      return {
          require: '?ngModel',
          link: function (scope, elem, attrs, ctrl) {
              if (!ctrl) return;

              ctrl.$formatters.unshift(function (a) {
                  return $filter(attrs.format)(ctrl.$modelValue)
              });

              elem.bind('blur', function(event) {
                  var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                  elem.val($filter(attrs.format)(plainNumber));
              });
          }
      };
  }]);

  function currentSpot() {
    // Sets defaults as empty
    var activeMenuId = '';
    var titleText = '';

    // Returns object with 3 operations 
    return {
      setCurrentSpot: function (menuId, title) {
        activeMenuId = menuId;
        titleText = title;
      },
      getActiveMenu: function () {
        return activeMenuId;
      },
      getTitle: function () {
        return titleText;
      }
    }
  }
  /*.run(['drupal', function(drupal) {
    
    drupal.node_load(1).then(function(node) {
      console.log(node.title);
    });

    var node = {
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


// The angular-drupal configuration settings for my simple app.
angular
  .module('angular-drupal').config(function($provide) {
    // Name our endpoint for Angular Drupal
    $provide.value('drupalSettings', {
      sitePath: 'http://api.buildboard.io',
      endpoint: 'investment/v1'
    });

});