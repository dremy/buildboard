/*
 * The Property API controller
 *
 * Exports 4 methods:
 *  - getAll
 *  - post
 *  - updateById
 *  - deleteById
 */
// Dependencies.
var mongoose  = require('mongoose'),
    Property  = require('../models/property');

module.exports = function() {
  return {
    /*
     * Get route to retrieve all the properties.
     */
    getAll : function(req, res) {
      var query = Property.find({});
      query.exec(function(err, properties) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(properties);
      });
    },
    /*
     * Post route to save a new property in the DB
     */
    post: function(req, res) {
      // Creates a new property.
      var newProperty = new Property(req.body);
      // Save it into the DB...
      newProperty.save(function(err, property) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(property);
      });
    },
    /*
     * Get a single property based on ID.
     */
    getOne: function(req, res) {
      Property.findById(req.params.id, function(err, property) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(property);
      });
    },
    /*
     * Update a property by ID.
     */
    updateById: function(req, res) {
      //Model.findByIdAndUpdate([conditions], [update], [options], [callback])
      Property.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, property) {
        if(err) res.send(err);
        res.json(property);
      });
    },
    deleteById: function(req, res) {
      Property.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) res.send(err);
        res.json(req.body);
      });
    },
    /*
     * Get route to retrieve all the properties.
     */
    getFiltered : function(req, res) {
      console.log(req.body);
      var query = Property.find(req.body);
      query.exec(function(err, properties) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(properties);
      });
    }
  };
};