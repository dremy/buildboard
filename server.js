
// Requirements
var express   = require('express'),
    mongoose  = require('mongoose'),
    morgan    = require('morgan'),
    bodyParser= require('body-parser'),
    path      = require('path');

// Instantiation
var app       = express(),
    port      = process.env.PORT || 3000;

// Route
var Property = require('./server/routes/property')();
var Relationship = require('./server/routes/relationship')();

// Some options
var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};

// Database Configuration
var database = process.env.MONGODB_URI || 'mongodb://127.0.0.1/buildboard';

mongoose.connect(database, options);
var db = mongoose.connection;

// If a DB error, console
db.on('error', console.error.bind(console, 'connection error:'));

// Log with Morgan
app.use(morgan('dev'));

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({text: 'application/json'}));

// Proxies
//-------------------------
// Search Proxy.
var Proxy = require('./server/proxies/proxy')();
app.route('/searchProxy')
  .get(Proxy.search);
// Details Proxy.
app.route('/detailsProxy')
  .get(Proxy.details);

// Static files
app.use(express.static(__dirname + '/app'));

// API Routes
//-------------------------
// Properties
app.route('/api/properties')
  .get(Property.getAll)
  .post(Property.post);

app.route('/api/properties/:id')
  .get(Property.getOne)
  .delete(Property.deleteById)
  .put(Property.updateById); 

app.route('/api/properties/query')
  .post(Property.getFiltered);

// Properties
app.route('/api/relationships')
  .get(Relationship.getAll)
  .post(Relationship.post);

app.route('/api/relationships/:id')
  .get(Relationship.getOne)
  .delete(Relationship.deleteById)
  .put(Relationship.updateById);

app.route('/api/relationships/query')
  .post(Relationship.getFiltered);

app.route('/api/relationships/properties')
  .post(Relationship.getRelationshipsProperties);

app.listen(port);
  console.log('listening on port ' + port);