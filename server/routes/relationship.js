/*
 * The Relationship API controller
 *
 * Exports 4 methods:
 *  - getAll
 *  - post
 *  - updateById
 *  - deleteById
 */
// Dependencies.
var mongoose  = require('mongoose'),
    Relationship  = require('../models/relationship'),
    Property  = require('../models/property');

module.exports = function() {
  return {
    /*
     * Get route to retrieve all the properties.
     */
    getAll : function(req, res) {
      var query = Relationship.find({});
      query.exec(function(err, relationships) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(relationships);
      });
    },
    /*
     * Post route to save a new relationship in the DB
     */
    post: function(req, res) {
      // Creates a new relationship.
      var newRelationship = new Relationship(req.body);
      // Save it into the DB...
      newRelationship.save(function(err, relationship) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(relationship);
      });
    },
    /*
     * Get a single relationship based on ID.
     */
    getOne: function(req, res) {
      Relationship.findById(req.params.id, function(err, relationship) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(relationship);
      });
    },
    /*
     * Update a relationship by ID.
     */
    updateById: function(req, res) {
      //Model.findByIdAndUpdate([conditions], [update], [options], [callback])
      Relationship.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, relationship) {
        if(err) res.send(err);
        res.json(relationship);
      });
    },
    deleteById: function(req, res) {
      Relationship.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) res.send(err);
        res.json(req.body);
      });
    },
    /*
     * Post route to retrieve filtered relationships.
     */
    getFiltered : function(req, res) {
      var query = Relationship.find(req.body);
      query.exec(function(err, relationships) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(relationships);
      });
    },
    /*
     * Post route to retrieve filtered relationships for properties.
     */
    getRelationshipsProperties : function(req, res) {
      Relationship
        .find(req.body)
        .populate('_property', 'title bedrooms bathrooms location images finishedSqFt')
        .populate('_events')
        .populate({
          path: '_boards',
          populate: {
            path: '_files'
          }})
        .exec(function(err, properties) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(properties);
      });
    },
    /*
     * Post route to retrieve filtered relationships for events.
     */
    getRelationshipsEvents : function(req, res) {
      Relationship
        .find(req.body)
        .populate('_events')
        .populate('_property', 'title images')
        .exec(function(err, events) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(events);
      });
    }
  };
};