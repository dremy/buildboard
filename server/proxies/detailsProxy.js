var request = require('request');

if(!process.env.ZWS_ID) {
  var env = require('./../env.js');
}
 
var detailsProxy = require('express').Router();

detailsProxy.route('')
  .get(
    function(req, res) {  
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
        var webServicesId = process.env.ZWS_ID;

        /** Build URL to Open
         * propertyDetailsApi: 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?
         * Format: http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=<zws-id>&zpid=<zpid>
         * Example: http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz19u0t23l4i3_a6mew&zpid=48768108
         */        
        var url = 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?';    
        url += 'zws-id=' + process.env.ZWSID;
        url += '&zpid=' + zpid;
        req.pipe(request(url)).pipe(res);
      } else {
        return console.log('Not working.');
      }
    }
);

module.exports = detailsProxy;