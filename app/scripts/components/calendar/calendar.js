'use strict';

/**
 * @ngdoc function
 * @name bb.calendar.controller:calendarsCtrl
 * @description
 * # calendarsCtrl
 * Controller of the bb.calendar
 */
(function(angular) {
function calendarsCtrl($state, rel, uiCalendarConfig, calendarDefault, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var calendars = this;
  calendars.eventSources = [{
    events: []
  }];
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
        calendars.eventSources[0].events.push(events[k]);
      }
    }
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type);    
  }
  // Set some configuration details.
  calendars.uiConfig = {
    calendar: calendarDefault
  };

  calendars.uiConfig.calendar.defaultView = 'agendaWeek';
}

function eventChanged(event, delta, revertFunc, jsEvent, ui, view) {
  console.log('delta', delta);
  console.log('event', event);
}

function eventClick(date, jsEvent, view) {
  console.log(date.title + ' was clicked.');
}

function eventRendered( event, element, view ) { 
  element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
  //$compile(element)($scope);
}

angular.module('bb.calendar', [])
  .controller('CalendarsCtrl', calendarsCtrl)
  .value('calendarDefault', {
      selectable: true,
      editable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek, listWeek'
      },
      views: {
        listWeek: { buttonText: 'list week' }
      },
      eventLimit: true,
      eventClick: eventClick,
      eventDrop: eventChanged,
      eventResize: eventChanged,
      eventRender: eventRendered
    });
})(angular);