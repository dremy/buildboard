'use strict';

/**
 * @ngdoc function
 * @name bb.calendar.controller:calendarsCtrl
 * @description
 * # calendarsCtrl
 * Controller of the bb.calendar
 */
function calendarsCtrl($state, rel, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var calendars = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  // Define functions.
  //-------------------------------
  function pushEvents(k) {

  }
  // Perform on load.
  //-------------------------------
  calendars.eventSources = [{
    events: [
      /*{title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29)}*/
      ],
  }];

  if (rel.data) {
    console.log('relationship', rel.data);
    // For each property.
    for (var i = 0; i < rel.data.length; i++) {
      // If that property has events.
      if(rel.data[i]._events.length) {
        // Create new variable full of events.
        var events = rel.data[i]._events;
        // For each event, push into eventSources
        for (var k = 0; k < events.length; k++) {
          calendars.eventSources[0].events.push(events[k]);
        };
      }
    }
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.calendar', [])
  .controller('CalendarsCtrl', calendarsCtrl);