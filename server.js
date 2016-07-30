
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
var User = require('./server/routes/user')();

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

mongoose.connect('mongodb://127.0.0.1/buildboard', options);
var db = mongoose.connection;

// If a DB error, console
db.on('error', console.error.bind(console, 'connection error:'));

/* Log with Morgan
app.user(morgan('dev'));*/

// Parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({text: 'application/json'}));

//Static files
app.use(express.static(__dirname + '/app'));

// API Routes
//-------------------------
// Users
app.route('/api/user')
  .get(User.getAll)
  .post(User.post);

app.route('/api/user/:id')
  .get(User.getOne)
  .delete(User.deleteById)
  .put(User.updateById); 

// Properties
app.route('/api/property')
  .get(Property.getAll)
  .post(Property.post);

app.route('/api/property/:id')
  .get(Property.getOne)
  .delete(Property.deleteById)
  .put(Property.updateById); 

app.listen(port);
  console.log('listening on port ' + port);