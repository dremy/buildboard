'use strict';

function zillowZervice($http, zillow) {

  function get(param) {
    return request("GET", param);
  }

  function request(verb, param, data) {
    var req = {
      method: verb,
      url: url(param),
      data: data
    };
    return $http(req);
  }

  function url(param) {
    /* Require requestType
     * 'details' = getUpdatedPropertyDetails API
     * 'address' = getDeepSearchResults API
     * */
    var finalUrl;
    if (param.requestType == 'details') {
      finalUrl = zillow.propertyDetailsApi + '?zpid=' + param.zpid;
      console.log('Final url:', finalUrl);
      return finalUrl;
    }
    if (param.requestType == 'address') {
      // Build final url.
      finalUrl = zillow.searchApi;
      if ('address' in param) {
        // Replaces spaces with '+';
        param.address = param.address.replace(/ /g, '+');
        finalUrl += '?address=' + param.address;
        console.log("Fixing up the ol' Addy", finalUrl);
        if (('city' in param) && ('state' in param)) {
          param.city = param.city.replace(/ /g, '+');
          finalUrl += '&city=' + param.city;
          finalUrl += '&state=' + param.state;
          console.log('Theres the city & state.', finalUrl);
          if ('zip' in param) {
            finalUrl += '&zip=' + param.zip;
            console.log('Oh! And it has a zip?', param.zip);
          }
        }
        if (!('city' in param) && !('state' in param) && ('zip' in param)) {
          finalUrl += '&zip' + param.zip;
          console.log('Just a zip.', param.citystatezip);
        }

        console.log('Final url:', finalUrl);
        return finalUrl;
      }
    }
  }

  return {
    getProperty: function(param) {
      return get(param);
    }
  };
}

angular.module('angular-zillow', [])
  .factory('zillowZervice', zillowZervice)
  .constant('zillow', {
    searchApi: 'searchProxy.php',
    propertyDetailsApi: 'detailsProxy.php'
  });