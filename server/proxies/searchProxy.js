var express = require('express');  
var request = require('request');

if(!process.env.ZWSID) {
  var env = require('./../env.js');
  if (env) {
    console.log('ZWSID is: ' + process.env.ZWSID);
  }
}

var app = express();  
app.use('/proxy', function(req, res) {  
  var url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id='
  + req.url.replace('/?url=','')
  + '&address=914+Warsaw+St&citystatezip=Seattle%2C+WA';
  console.log(url);
  console.log(req.url);
  req.pipe(request(url)).pipe(res);
});

var port = process.env.PORT || 3000;
app.listen(port);
  console.log('listening on port ' + port);