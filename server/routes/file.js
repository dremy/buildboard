/*
 * The Board API controller
 *
 * Exports 4 methods:
 *  - getAll
 *  - post
 *  - updateById
 *  - deleteById
 */
// Dependencies.
var mongoose  = require('mongoose'),
    File  = require('../models/file');

module.exports = function() {
  return {
    /*
     * Get route to retrieve all the files.
     */
    getAll : function(req, res) {
      var query = File.find({});
      query.exec(function(err, files) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(files);
      });
    },
    /*
     * Post route to save a new file in the DB
     */
    post: function(req, res) {
      // Creates a new file.
      var newFile = new File(req.body);
      // Save it into the DB...
      newFile.save(function(err, file) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(file);
      });
    },
    /*
     * Get a single board based on ID.
     */
    getOne: function(req, res) {
      File.findById(req.params.id, function(err, file) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(file);
      });
    },
    /*
     * Update a board by ID.
     */
    updateById: function(req, res) {
      //Model.findByIdAndUpdate([conditions], [update], [options], [callback])
      File.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, file) {
        if(err) res.send(err);
        res.json(file);
      });
    },
    deleteById: function(req, res) {
      File.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) res.send(err);
        res.json(req.body);
      });
    },
    /*
     * Post route to retrieve filtered file.
     */
    getFiltered : function(req, res) {
      var query = File.find(req.body);
      query.exec(function(err, files) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(files);
      });
    },
    /*
     * Post route to retrieve filtered files.
     */
    getFileBoard : function(req, res) {
      File
        .find(req.body)
        .populate('_board')
        .exec(function(err, files) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(files);
      });
    }
  };
};