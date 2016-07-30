/*
 * The User API controller
 *
 * Exports 4 methods:
 *  - getAll
 *  - post
 *  - updateById
 *  - deleteById
 */
// Dependencies.
var mongoose  = require('mongoose'),
    User  = require('../models/user');

module.exports = function() {
  return {
    /*
     * Get route to retrieve all the properties.
     */
    getAll : function(req, res) {
      var query = User.find({});
      query.exec(function(err, users) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(users);
      });
    },
    /*
     * Post route to save a new property in the DB
     */
    post: function(req, res) {
      // Creates a new property.
      var newUser = new User(req.body);
      // Save it into the DB...
      newUser.save(function(err, user) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(user);
      });
    },
    /*
     * Get a single property based on ID.
     */
    getOne: function(req, res) {
      User.findById(req.params.id, function(err, user) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(user);
      });
    },
    /*
     * Update a property by ID.
     */
    updateById: function(req, res) {
      //Model.findByIdAndUpdate([conditions], [update], [options], [callback])
      User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
        if(err) res.send(err);
        res.json(user);
      });
    },
    deleteById: function(req, res) {
      User.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) res.send(err);
        res.json(req.body);
      });
    }
  }
};