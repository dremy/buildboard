'use strict';

// ===========================================================
// The angular-drupal configuration settings for my simple app.

//Initial Config
//------------------------------------
//Setup the Site Path.
var sitePath = '';
switch (location.host) {
  case 'localhost':
    sitePath = 'http://localhost/bb_pantheon/buildboard/';
  break;
  case 'dev-buildboard.pantheonsite.io':
    sitePath = 'http://dev-buildboard.pantheonsite.io/';
  break;
}

//Setup Angular Drupal.
//------------------------------------
angular
  .module('angular-drupal')
    .config(function($provide) {
      // Name our endpoint for Angular Drupal
      $provide.value('drupalSettings', {
        sitePath: sitePath,
        endpoint: 'v1/api'
      });
    })
    .config(['$httpProvider', //TO DO - Is this actually needed?
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