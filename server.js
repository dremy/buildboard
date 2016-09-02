
// Requirements
var express   = require('express'),
    mongoose  = require('mongoose'),
    morgan    = require('morgan'),
    bodyParser= require('body-parser'),
    path      = require('path');

if (!process.env.STACK_ENV) {
  var env = require('./server/env.js');
}

// Instantiation
var app       = express(),
    port      = process.env.PORT || 3000;

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

// Database Configuration.
var dbConnection = process.env.MONGODB_URI; // Pull from config vars.
mongoose.connect(dbConnection, options); // Connect to db.
var db = mongoose.connection; //Prep for events.

// If a DB error, console
db.on('error', console.error.bind(console, 'Connection error:'));

// Log with Morgan
app.use(morgan('dev'));

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({text: 'application/json'}));

// Static files
app.use(express.static(__dirname + '/app'));

// API Routes
//-------------------------
// Route Dependencies
var Property = require('./server/routes/property')();
var Relationship = require('./server/routes/relationship')();
var Event = require('./server/routes/event')();
var Board = require('./server/routes/board')();
var File = require('./server/routes/file')();

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

// Relationships
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

app.route('/api/relationships/events')
  .post(Relationship.getRelationshipsEvents);

// Events
app.route('/api/events')
  .get(Event.getAll)
  .post(Event.post);

app.route('/api/events/:id')
  .get(Event.getOne)
  .delete(Event.deleteById)
  .put(Event.updateById);

app.route('/api/events/query')
  .post(Event.getFiltered);

app.route('/api/events/relationship')
  .post(Event.getEventRelationship);

app.route('/api/events/files')
  .post(Event.getEventFiles);

// Boards
app.route('/api/boards')
  .get(Board.getAll)
  .post(Board.post);

app.route('/api/boards/:id')
  .get(Board.getOne)
  .delete(Board.deleteById)
  .put(Board.updateById);

app.route('/api/boards/query')
  .post(Board.getFiltered);

app.route('/api/boards/relationship')
  .post(Board.getBoardRelationship);

app.route('/api/boards/files')
  .post(Board.getBoardFiles);

// Files
app.route('/api/files')
  .get(File.getAll)
  .post(File.post);

app.route('/api/files/:id')
  .get(File.getOne)
  .delete(File.deleteById)
  .put(File.updateById);

app.route('/api/files/query')
  .post(File.getFiltered);

app.route('/api/files/board')
  .post(File.getFileBoard);

// Proxies
//-------------------------
var Proxy = require('./server/proxies/proxy')();
// Search Proxy.
app.route('/searchProxy')
  .get(Proxy.search);
// Details Proxy.
app.route('/detailsProxy')
  .get(Proxy.details);

// Execute
//------------------------- 
app.listen(port);
  console.log('listening on port ' + port);