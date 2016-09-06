'use strict';

/**
 * @ngdoc function
 * @name bb.calendar.controller:addEventCtrl
 * @description
 * # AddBoardCtrl
 * Controller of the bb.board
 */
function addEventCtrl($state, $scope, relationshipService, eventService, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var Event = this;
  Event.data = { //new Event();
    title: '',
    desciption: '',
    location: '',
    allDay: false,
    _relationship: '',
    startDate: '',//moment(),
    startTime: '',// moment().format('LT'),
    endDate: '', //moment(),
    endTime: ''//moment().format('LT'),
  };
  /*if (pid) {
    Event.data._property = ;
  }*/

  if (rel.data) {
    Event.relationships = rel.data;
    console.log('Event', Event);
  }
  // Define functions.
  //-------------------------------
  function placeChanged() {
    Event.place = this.getPlace();
  }

  function matchRelationship(obj) {
    return obj._id === Event.data._relationship;
  }

  function saveEvent() {
    // Setup relationship.
    Event.relationship = Event.relationships.filter(matchRelationship)[0];
    console.log("Event relationship", Event.relationship);
    // Setup dates.
    var dates = [Event.data.startDate, Event.data.endDate];
    var times = [Event.data.startDate, Event.data.endDate];
    /*dates.push(Event.data.startDate);
    dates.push(Event.data.endDate);
    for (var i = 0; i < dates.length; i++) {
      if (dates[i]) {

      }
    };*/
    // Process Dates.
    if (Event.data.startDate) {
      // Format "7 September, 2016 09:15AM"
      var startDate = Event.data.startDate + ' ' + Event.data.startTime;
      startDate = moment(startDate, "D MMMM, YYYY hh:mmA");
      Event.data.start = startDate._d;
    }
    if (Event.data.endDate) {
      var endDate = Event.data.endDate + ' ' + Event.data.endTime;
      endDate = moment(endDate, "D MMMM, YYYY hh:mmA");
      Event.data.end = endDate._d;
    }
    // TRY WITH unnecessary data too.
    // Delete unnecessary data;
    delete Event.data.startDate;
    delete Event.data.startTime;
    delete Event.data.endDate;
    delete Event.data.endTime;

    // Create the event.
    eventService.addEvent(Event.data)
      .success(
        function(data) {
          if (!data.error) {
            console.log('Created Event', data);
            // Setup update.
            var update = {
              _events: Event.relationship._events,
              _id: Event.data._relationship
            };

            // If there are any existing events.
            if (update._events.length) {
              // Check to ensure reference doesn't already exist.
              if (update._events.indexOf(data._id) !== -1) {
                return console.log('Already exists.', update);
              }
            }
            // Push new reference.
            update._events.push(data._id);
            console.log('Update Data', update);
            // Update the relationship.
            relationshipService.updateRelationship(update)
              .success(function(data) {
                console.log('Updated Relationship', data);
              })
              .then(function() {
                alert.message = Event.data.title + ' has been created.';
                messages.add(alert.message, alert.type.success, alert.dt);
                $state.go('calendars');
                //$state.go('property', {id: Event.relationship._property._id});
              });
          } else {
            return console.log('Failed', data);
          }
        }
      )
      .error(function(data) {
        console.log('Failed', data);
      });
  }
  // Perform on load.
  //-------------------------------
  Event.placeChanged = placeChanged;
  Event.saveEvent = saveEvent;
}

angular.module('bb.event', [])
  .controller('AddEventCtrl', addEventCtrl);