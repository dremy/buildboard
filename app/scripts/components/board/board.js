'use strict';

/**
 * @ngdoc function
 * @name bb.board.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the bb.board
 */
function boardCtrl($state, $scope, filepickerService, relationshipService, boardService, fileService, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var board = this;
  board.data = {
    title: '',
    _files: [],
    _tags: '',
    desciption: ''
  };
  board.files = {};
  var relationship = rel.data[0];
  board.relationship = relationship;
  // Define functions.
  //-------------------------------
  //Multiple files upload set to 3 as max number
  function uploadMultiple() {
    filepickerService.pickMultiple(
      {
        language: 'en',
        //maxFiles: 3, //pickMultiple has one more option
        services: ['COMPUTER','URL','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
        openTo: 'COMPUTER'
      },
      function(Blob){
        board.files = Blob;
        $scope.$apply();
        saveFiles(Blob);
      }
    );
  }

  function saveFiles(Blob) {
    console.log('Type of Blob', typeof Blob);
    for (var i in Blob) {
      delete Blob[i].id; // No need to store id.
      fileService.addFile(Blob[i])
        .success(
          function(file) {
            board.data._files.push(file._id);
          }
        );
    }
  }

  function saveBoard() {
    board.data._tags = $('#chips').material_chip('data');
    // Set the relationship ID
    board.data._relationship = relationship._id;
    // Create the board.
    boardService.addBoard(board.data)
      .success(
        function(data) {
          if (!data.error) {
            console.log('Created Board', data);
            var update = {
              _boards: relationship._boards,
              _id: data._relationship || relationship._id
            };
            update._boards.push(data._id);
            console.log('Update Data', update);
            relationshipService.updateRelationship(update)
              .success(function(data) {
                console.log('Updated Relationship', data);
              })
              .then(function() {
                $state.go('property', {id: relationship._property._id})
              });
          } else {
            console.log('Failed', data);
          }
        }
      )
      .error(function(data) {
        console.log('Failed', data);
      });
  }
  // Perform on load.
  //-------------------------------
  $('#chips').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: 'Add a tag. Press Enter.',
    data:[]
  });
  board.saveBoard = saveBoard;
  board.uploadMultiple = uploadMultiple;
}

angular.module('bb.board', [])
  .controller('BoardCtrl', boardCtrl);