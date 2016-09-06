'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:AboutCtrl
 * @description
 * # PropertyCtrl
 * Controller of the buildboardApp
 */
(function(angular) {
function propertyCtrl($state, rel, uiCalendarConfig, calendarDefault, messages, alert, preloader) { 
  // Initialize variables.
  //-------------------------------  
  var property = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
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

  function renderCalendar(calendar) {
    if (uiCalendarConfig.calendars[calendar]){
      setTimeout(function() {
        console.log(uiCalendarConfig.calendars[calendar]);
        uiCalendarConfig.calendars.propertyCalendar.fullCalendar('render');
      }, 100);
    }
  }

  function eventRendered( event, element, view ) { 
    element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
    // $compile(element)($scope);
  }

  // Perform on load.
  //-------------------------------
  // Set empty.
  property.eventSources = [{
    events: rel.data[0]._events
      }];
  property.renderCalendar = renderCalendar;
  // Set some configuration details.
  property.uiConfig = {
    calendar: calendarDefault
  };

  property.uiConfig.calendar.header.right = '';
  property.uiConfig.calendar.defaultView = 'listWeek';

  if (rel.data[0]) {
    // Set data for view.
    property.details = rel.data[0]._property;
    property.boards = rel.data[0]._boards;
    property.events = rel.data[0]._events;
    // Process boards.
    for (var i in property.boards) {
      processFileThumbCrops(i);
      processTagCommas(i);
    }
    console.log('relationship', rel.data[0]);
    console.log('property', property.details);
    console.log('boards', property.boards);
    console.log('events', property.events);
  } else {
    alert.message = 'Adding failed due to ' + reason.statusText + '. Try again later.';
    alert.type = 'warning';
    messages.add(alert.message, alert.type, alert.dt);    
  }
}

angular.module('bb.property', [])
  .controller('PropertyCtrl', propertyCtrl);
})(angular);