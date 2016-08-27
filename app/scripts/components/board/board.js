'use strict';

/**
 * @ngdoc function
 * @name bb.board.controller:boardCtrl
 * @description
 * # boardCtrl
 * Controller of the bb.board
 */
function boardCtrl(brd, prop, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var board = this;
  // Define functions.
  //-------------------------------
  function processTagCommas(i) {
    var board = property.boards[i];
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
    var file = board.details._files[i];
    file.cropped = 'https://process.filestackapi.com/AbxbbjIjQuq0m1MnLf9n0z/crop=d:[0,0,255,262]/' + file.url; 
  }
  // Perform on load.
  //-------------------------------
  if (brd && prop) {
    board.details = brd.data[0];
    board.property = prop.data;

    if (typeof board.details._files !== 'undefined' && board.details._files.length > 0) {
      for (var i in board.details._files) {
        processFileThumbCrops(i);
        //processTagCommas(i);
      }
    }
    console.log(board.details);
    console.log(board.property);
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.board')
  .controller('BoardCtrl', boardCtrl);