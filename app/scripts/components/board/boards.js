'use strict';

/**
 * @ngdoc function
 * @name bb.board.controller:boardCtrl
 * @description
 * # boardCtrl
 * Controller of the bb.board
 */
function boardsCtrl($state, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var boards = this;
  // Define functions.
  //-------------------------------
  function processTagCommas(i) {
    var board = boards.details[i];
    if (typeof board._tags !== 'undefined' && board._tags.length > 0) {
      for (var j in board._tags) {
        var tag = board._tags[j];
        if (parseInt(j) !== 0) {
          tag.tag = ', ' + tag.tag;
        }
      }
    }
  }

  function processFileThumbCrops(i) {
    var board = boards.details[i];
    if (typeof board._files !== 'undefined' && board._files.length > 0) {
      for (var j in board._files) {
        var file = board._files[j];
        file.cropped = 'https://process.filestackapi.com/AbxbbjIjQuq0m1MnLf9n0z/crop=d:[0,0,255,262]/' + file.url; 
      }
    }
  }
  // Perform on load.
  //-------------------------------
  if (rel.data[0]) {
    boards.property = rel.data[0]._property;
    boards.details = rel.data[0]._boards;

    for (var i in boards.details) {
      processFileThumbCrops(i);
      processTagCommas(i);
    }
    console.log('relationship', rel.data[0]);
    console.log('property', boards.property);
    console.log('boards', boards.details);
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.board')
  .controller('BoardsCtrl', boardsCtrl);