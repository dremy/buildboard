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
    desciption: '',
    location: '',
    allDay: false,
    startDate: moment(),
    startTime: moment().format('LT'),
    endDate: moment(),
    endTime: moment().format('LT'),
  };
  /*if (pid) {
    Event.data._property = ;
  }*/

  if (rel.data) {
    Event.relationship = rel.data;
    console.log('Event', Event);
  }
  // Define functions.
  //-------------------------------
  function placeChanged() {
    Event.place = this.getPlace();
  }

  function saveEvent() {
    var startDate = Event.data.startDate + ' ' + Event.data.startTime;
    console.log(startDate);
    var SD = moment(startDate, "D MMMM, YYYY hh:mmA");
    console.log(SD);
    Event.data.start = SD;
    console.log(Event.data);
    // Set the relationship ID
    // Event.data._relationship = relationship._id;
    // Create the board.
    /*eventService.addEvent(event.data)
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
      });*/
  }
  // Perform on load.
  //-------------------------------
  Event.placeChanged = placeChanged;
  Event.saveEvent = saveEvent;
}

angular.module('bb.event', [])
  .controller('AddEventCtrl', addEventCtrl);