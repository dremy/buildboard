'use strict';

// ===========================================================
// The angular-drupal configuration settings for my simple app.

//Initial Config
//------------------------------------
var sitePath = '';
if (location.host === 'localhost') {
  sitePath = 'http://localhost/bb_pantheon/buildboard/';
} else {
  console.log(location.host);
  sitePath = 'http://dev-buildboard.pantheonsite.io/';
}

//TO DO - Move to Switch statement
/*switch (location.host) {
  case 'localhost':
    sitePath = 'http://localhost/bb_pantheon/buildboard/';
  break;
}*/

//Setup Angular Drupal
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