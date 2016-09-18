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

function propertyMaker(zillowZervice, $q, preloader, alert, messages) {
  
  propertyMaker.addProperty = function(location) {
    var property = {},
    searchData = {},
    detailsData = {};

    preloader.setState(true);
    var deferred = $q.defer();
    zillowZervice.getProperty(location)
      .success(
        function(data) {
          // Turn to JSON object
          searchData = $.xml2json(data);
          console.log(searchData);
          if(searchData.response) {
            var searchResult = searchData.response.results.result;

            var items = ["bedrooms",
            "bathrooms",
            "FIPScountry",
            "finishedSqFt",
            "lotSizeSqFt",
            "useCode",
            "yearBuilt",
            "zpid",
            "lastSoldDate",
            "taxAssessment",
            "taxAssessmentYear"];
            for (var k in items) {
              if (searchResult.hasOwnProperty(items[k])) {
                property[items[k]] = searchResult[items[k]];
              }
            };

            if (searchResult.lastSoldPrice) {
              property.lastSoldPrice = searchResult.lastSoldPrice.text;
            }

            if (searchResult.address) {
              property.location = {
                address: searchResult.address.street,
                city: searchResult.address.city,
                state: searchResult.address.state,
                zip: searchResult.address.zipcode,
                lat: searchResult.address.latitude,
                lng: searchResult.address.longitude,
              };
              property.location.formatted = searchResult.address.street;
              property.location.formatted += ' ' + searchResult.address.city;
              property.location.formatted += ', ' + searchResult.address.state;
              property.location.formatted += ' ' + searchResult.address.zipcode;
            }

            if (searchResult.zestimate) {
              property.zestimate = {
                lastUpdated: searchResult.zestimate.last_updated,
                amount: searchResult.zestimate.amount.text,
                valuationRange: {
                  high: searchResult.zestimate.valuationRange.high.text,
                  low: searchResult.zestimate.valuationRange.low.text
                },
                valueChange: {
                  duration: searchResult.zestimate.valueChange.duration,
                  value: searchResult.zestimate.valueChange.text
                }
              };
            }

            //Setup request for deeper details.
            var req = {
              zpid: property.zpid,
              requestType: 'details'
            };
            zillowZervice.getProperty(req)
              .success(
                function(data) {
                  if (searchData.response) {
                    detailsData = $.xml2json(data);
                    console.log(detailsData);
                    var detailsResult = detailsData.response;
                    if (detailsResult.numFloors) property.numFloors = detailsResult.numFloors;
                    if (detailsResult.parkingType) property.parkingType = detailsResult.parkingType;
                    if (detailsResult.price) property.price = detailsResult.price.text;
                    if (detailsResult.homeDescription) property.description = detailsResult.homeDescription;
                    if (detailsResult.images) {
                      if (parseInt(detailsResult.images.count) > 1) {
                        property.images = detailsResult.images.image.url;
                        for (var i in property.images) {
                          property.images[i] = property.images[i].replace('http:','https:');
                        };
                      } else if (parseInt(detailsResult.images.count) == 1) {
                        property.images = [];
                        property.images[0] = detailsResult.images.image.url.replace('http:','https:');
                      }
                    }
                  } else {
                    preloader.setState(false);
                    alert.message = searchData.message.text[0];
                    alert.type = 'warning';
                    messages.add(alert.message, alert.type, alert.dt);
                  }
                }
              ).then(
                function() {
                  console.log(property);
                  preloader.setState(false);
                  deferred.resolve(property);
                }
              );
            } else {
              preloader.setState(false);
              alert.message = searchData.message.text[0];
              alert.type = 'warning';
              messages.add(alert.message, alert.type, alert.dt);
            }
        }
      );

    return deferred.promise;
  }

  return propertyMaker;
}

angular.module('angular-zillow', [])
  .factory('zillowZervice', zillowZervice)
  .factory('propertyMaker', propertyMaker)
  // Node.js Proxies
  .constant('zillow', {
    searchApi: location.origin + '/searchProxy',
    propertyDetailsApi: location.origin + '/detailsProxy'
  });
/* PHP Proxies
  .constant('zillow', {
    searchApi: location.origin + '/proxies/searchProxy.php',
    propertyDetailsApi: location.origin + '/proxies/detailsProxy.php'
  });*/