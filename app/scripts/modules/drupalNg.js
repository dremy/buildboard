'use strict';

// The angular-drupal configuration settings for my simple app.
angular
  .module('angular-drupal')
    .config(function($provide) {
      // Name our endpoint for Angular Drupal
      $provide.value('drupalSettings', {
        sitePath: 'http://api.buildboard.io',
        endpoint: 'v1/api'
      });
    })
    .config(['$httpProvider',
      function($httpProvider) {
        $httpProvider.interceptors.push(['$q',
          function($q) {
            return {
              request: function(config) {
                config.withCredentials = true;
                return config;
              }
            };
          }
        ]);
      }
    ]);