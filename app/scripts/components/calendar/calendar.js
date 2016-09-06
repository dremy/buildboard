'use strict';

/**
 * @ngdoc function
 * @name bb.calendar.controller:calendarsCtrl
 * @description
 * # calendarsCtrl
 * Controller of the bb.calendar
 */
function calendarsCtrl($state, rel, uiCalendarConfig, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var calendars = this;
  calendars.eventSources = [{
    events: []
  }];
  calendars.uiConfig = {
    calendar: {
      editable: true,
      header: {
        left: 'month agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next' 
      }
    }
  };
  // Date helpers.
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  // Define functions.
  //-------------------------------
  // Perform on load.
  //-------------------------------  
  if (rel.data) {
    console.log('relationship', rel.data);
    calendars.relationships = rel.data;
    // For each relationship.
    for (var i = 0; i < rel.data.length; i++) {
      // Create new variable full of events.
      var events = rel.data[i]._events;
      // For each event, push into eventSources
      for (var k = 0; k < events.length; k++) {
        events[k].className = 'property-'+i;
        console.log(events[k]);
        calendars.eventSources[0].events.push(events[k]);
      }
    }
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type);    
  }
}

angular.module('bb.calendar', [])
  .controller('CalendarsCtrl', calendarsCtrl);