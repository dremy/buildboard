'use strict';

/**
 * @ngdoc overview
 * @name buildboardApp
 * @description
 * # buildboardApp
 *
 * Main module of the application.
 */
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
  };
}

function bbActiveMenu(currentSpot) {
  return function (scope, element, attrs) {
    // Set values to attributes.
    var activeMenuId = attrs.bbActiveMenu; // attrs["bbActiveMenu"]
    var activeTitle = attrs.bbActiveTitle; // attrs['bbActiveTitle']
    // Reuse depending on the new values.
    currentSpot.setCurrentSpot(activeMenuId, activeTitle);
  };
}

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
      .when('/benefits', {
        templateUrl: 'views/benefits.html',
        controller: 'BenefitsCtrl',
        controllerAs: 'benefits'
      })
      .when('/how-it-works', {
        templateUrl: 'views/how-it-works.html',
        controller: 'HowWorksCtrl',
        controllerAs: 'howworks'
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
      .when('/property/:pid/documents', {
        templateUrl: 'views/documents.html',
        controller: 'DocumentsCtrl',
        controllerAs: 'documents'
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
  // Allows you to format values for active menu and title.
  .directive('bbActiveMenu', bbActiveMenu)
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
      endpoint: 'properties/v1/node'
    });
  });
