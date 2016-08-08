'use strict';

/**
 * @ngdoc function
 * @name bb.file.controller:FileCtrl
 * @description
 * # FileCtrl
 * Controller of the bb.board
 */
function fileCtrl($state, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var file = this;
  file.data = {
    title: ''
  };
  // Define functions.
  //-------------------------------
  function saveFile() {
    file.data.tags = $('#chips').material_chip('data');
    console.log(file.data);
  }
  // Perform on load.
  //-------------------------------
  $('#chips').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: 'Add a tag. Press Enter.'
  });

  file.saveFile = saveFile;
}

angular.module('bb.file', [])
  .controller('FileCtrl', fileCtrl);