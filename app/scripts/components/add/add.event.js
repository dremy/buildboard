'use strict';

/**
 * @ngdoc function
 * @name bb.calendar.controller:addEventCtrl
 * @description
 * # AddBoardCtrl
 * Controller of the bb.board
 */
function addEventCtrl($state, $scope, relationshipService, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var Event = this;
  Event.data = {
    title: '',
    _tags: '',
    desciption: ''
  };
  var relationship = rel.data;
  Event.relationship = relationship;

  Event.properties = []; 
  console.log('rel', rel.data);
  // Define functions.
  //-------------------------------

  function saveEvent() {
    Event.data._tags = $('#chips').material_chip('data');
    // Set the relationship ID
    Event.data._relationship = relationship._id;
    // Create the board.
    eventService.addEvent(event.data)
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
  Event.currentDate = new Date();
  Event.currentTime = new Date();
  Event.saveEvent = saveEvent;
}

angular.module('bb.event', [])
  .controller('AddEventCtrl', addEventCtrl);