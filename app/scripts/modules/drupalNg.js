// The angular-drupal configuration settings for my simple app.
angular
  .module('angular-drupal').config(function($provide) {
    // Name our endpoint for Angular Drupal
    $provide.value('drupalSettings', {
      sitePath: 'http://api.buildboard.io',
      endpoint: 'properties/v1'
    });
  });