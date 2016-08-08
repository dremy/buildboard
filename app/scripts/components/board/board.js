'use strict';

/**
 * @ngdoc function
 * @name bb.board.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the bb.board
 */
function boardCtrl($state, $scope, filepickerService, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var board = this;
  board.data = {
    title: '',
    multipleFiles: {}
  };
  // Define functions.
  //-------------------------------
  //Multiple files upload set to 3 as max number
  function uploadMultiple() {
    filepickerService.pickMultiple(
      {
        mimetype: 'image/*',
        language: 'en',
        maxFiles: 3, //pickMultiple has one more option
        services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
        openTo: 'IMAGE_SEARCH'
      },
      function(Blob){
        board.data.multipleFiles = Blob;
        $scope.$apply();
      }
    );
  }

  function saveBoard() {
    board.data.tags = $('#chips').material_chip('data');
    console.log(board.data);
  }
  // Perform on load.
  //-------------------------------
  $('#chips').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: 'Add a tag. Press Enter.'
  });

  board.saveBoard = saveBoard;
  board.uploadMultiple = uploadMultiple;
}

angular.module('bb.board', [])
  .controller('BoardCtrl', boardCtrl);