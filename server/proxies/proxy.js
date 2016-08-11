// Grab dependencies.
var request = require('request');

if(!process.env.ZWS_ID) {
  var env = require('./../env.js');
}

module.exports = function() {
  return {
    search : function(req, res) {
      // TO DO: Consider 'https://github.com/sindresorhus/query-string'
      function getParam (sname) {
        // Validate String type.
        if (typeof sname !== 'string') {
          return {};
        }
        // Validate value is not empty.
        if (!sname) {
          return {};
        }
        var proxyUrl = req.url.replace('/','');
        var params = proxyUrl.substr(proxyUrl.indexOf("?")+1);
        var sval = "";
        params = params.split("&");
          // split param and value into individual pieces
          for (var i=0; i<params.length; i++)
             {
               temp = params[i].split("=");
               if ( [temp[0]] == sname ) { sval = temp[1]; }
             }
        return sval;
      }

      var webServicesId = process.env.ZWS_ID;
      if(getParam('address')) {
        var address = getParam('address');    
      }
      if(getParam('city')) {
        var city = getParam('city');    
      }
      if(getParam('state')) {
        var state = getParam('state');    
      }
      if(getParam('zip')) {
        var zip = getParam('zip');    
      }

      var citystatezip = '';

      // If City & State are passed..
      if (city && state) {
        citystatezip = city;
        citystatezip += '%2C+';
        citystatezip += state;
        //If zip is also present, append.
        if (zip) {
          citystatezip += '+' + zip;
        }
      }
      // If no City or State, but zip, set to zip.
      if ((!city || !state) && zip) {
        citystatezip = zip;
      }

      //If just city or state, won't pass due to 'citystatezip' being and empty string.
      if (address && citystatezip) {
        /** Build URL to request
         * searchApi: 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?
         * Format: http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<zws-id>&address=<address>&citystatezip=<city, state zip>
         * Example: http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz19u0t23l4i3_a6mew&address=914+Warsaw+St&citystatezip=Seattle%2C+WA
         */
        var url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?';    
        url += 'zws-id=' + process.env.ZWS_ID;
        url += '&address=' + address;
        url += '&citystatezip=' + citystatezip;
        req.pipe(request(url)).pipe(res);
      } else {
        return console.log('Not working.');
      }
    },
    details : function (req, res) {
      // TO DO: Consider 'https://github.com/sindresorhus/query-string'
      function getParam (sname) {
        // Validate String type.
        if (typeof sname !== 'string') {
          return {};
        }
        // Validate value is not empty.
        if (!sname) {
          return {};
        }
        var proxyUrl = req.url.replace('/','');
        var params = proxyUrl.substr(proxyUrl.indexOf("?")+1);
        var sval = "";
        params = params.split("&");
          // split param and value into individual pieces
          for (var i=0; i<params.length; i++)
             {
               temp = params[i].split("=");
               if ( [temp[0]] == sname ) { sval = temp[1]; }
             }
        return sval;
      }

      // Requires zpid.
      if(getParam('zpid')) {
        // Get variables.
        var zpid = getParam('zpid');

        /** Build URL to Open
         * propertyDetailsApi: 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?
         * Format: http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=<zws-id>&zpid=<zpid>
         * Example: http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz19u0t23l4i3_a6mew&zpid=48768108
         */        
        var url = 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?';    
        url += 'zws-id=' + process.env.ZWS_ID;
        url += '&zpid=' + zpid;
        req.pipe(request(url)).pipe(res);
      } else {
        return console.log('Not working.');
      }
    }
  };
};