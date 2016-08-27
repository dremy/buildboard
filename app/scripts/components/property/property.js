'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
(function(angular) {
function propertyCtrl($state, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var property = this;
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
    var board = property.boards[i];
    if (typeof board._files !== 'undefined' && board._files.length > 0) {
      for (var j in board._files) {
        var file = board._files[j];
        file.url = 'https://process.filestackapi.com/AbxbbjIjQuq0m1MnLf9n0z/crop=d:[0,0,255,262]/' + file.url; 
      }
    }
  }
  // Perform on load.
  //-------------------------------
  if (rel.data[0]) {
    property.details = rel.data[0]._property;
    property.boards = rel.data[0]._boards;

    for (var i in property.boards) {
      processFileThumbCrops(i);
      processTagCommas(i);
    }
    console.log('relationship', rel.data[0]);
    console.log('property', property.details);
    console.log('boards', property.boards);
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.property', [])
  .controller('PropertyCtrl', propertyCtrl);
})(angular);  