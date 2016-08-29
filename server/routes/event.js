/*
 * The Event API controller
 *
 * Exports 4 methods:
 *  - getAll
 *  - post
 *  - updateById
 *  - deleteById
 */
// Dependencies.
var mongoose  = require('mongoose'),
    Event  = require('../models/event');

module.exports = function() {
  return {
    /*
     * Get route to retrieve all the events.
     */
    getAll : function(req, res) {
      var query = Event.find({});
      query.exec(function(err, events) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(events);
      });
    },
    /*
     * Post route to save a new event in the DB
     */
    post: function(req, res) {
      // Creates a new board.
      var newEvent = new Event(req.body);
      // Save it into the DB...
      newEvent.save(function(err, event) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(event);
      });
    },
    /*
     * Get a single event based on ID.
     */
    getOne: function(req, res) {
      console.log(req.params.id);
      Event.findById(req.params.id, function(err, event) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(event);
      });
    },
    /*
     * Update a event by ID.
     */
    updateById: function(req, res) {
      //Model.findByIdAndUpdate([conditions], [update], [options], [callback])
      Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, event) {
        if(err) res.send(err);
        res.json(event);
      });
    },
    deleteById: function(req, res) {
      Event.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) res.send(err);
        res.json(req.body);
      });
    },
    /*
     * Post route to retrieve filtered events.
     */
    getFiltered : function(req, res) {
      var query = Event.find(req.body);
      query.exec(function(err, events) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(events);
      });
    },
    /*
     * Post route to retrieve filtered events and get the.
     */
    getEventRelationship : function(req, res) {
      Event
        .find(req.body)
        // Populating across multiple levels
        // Get Relationship's Property
        .populate({
          path: '_relationship',
          populate: { path: '_property' }
        })
        .exec(function(err, events) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(events);
      });
    },
    /*
     * Post route to retrieve filtered events.
     */
    getEventFiles : function(req, res) {
      Event
        .find(req.body)
        .populate('_files')
        .exec(function(err, events) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(events);
      });
    }
  };
};