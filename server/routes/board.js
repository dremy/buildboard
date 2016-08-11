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
    Board  = require('../models/board');

module.exports = function() {
  return {
    /*
     * Get route to retrieve all the boards.
     */
    getAll : function(req, res) {
      var query = Board.find({});
      query.exec(function(err, boards) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(boards);
      });
    },
    /*
     * Post route to save a new board in the DB
     */
    post: function(req, res) {
      // Creates a new board.
      var newBoard = new Board(req.body);
      // Save it into the DB...
      newBoard.save(function(err, board) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(board);
      });
    },
    /*
     * Get a single board based on ID.
     */
    getOne: function(req, res) {
      console.log(req.params.id);
      Board.findById(req.params.id, function(err, board) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(board);
      });
    },
    /*
     * Update a board by ID.
     */
    updateById: function(req, res) {
      //Model.findByIdAndUpdate([conditions], [update], [options], [callback])
      Board.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, board) {
        if(err) res.send(err);
        res.json(board);
      });
    },
    deleteById: function(req, res) {
      Board.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) res.send(err);
        res.json(req.body);
      });
    },
    /*
     * Post route to retrieve filtered boards.
     */
    getFiltered : function(req, res) {
      var query = Board.find(req.body);
      query.exec(function(err, boards) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(boards);
      });
    },
    /*
     * Post route to retrieve filtered boards.
     */
    getBoardRelationship : function(req, res) {
      Board
        .find(req.body)
        .populate('_relationship')
        .exec(function(err, boards) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(boards);
      });
    },
    /*
     * Post route to retrieve filtered boards.
     */
    getBoardFiles : function(req, res) {
      Board
        .find(req.body)
        .populate('_files')
        .exec(function(err, boards) {
        if(err) res.send(err);
        // If no errors, send back to client.
        res.json(boards);
      });
    }
  };
};