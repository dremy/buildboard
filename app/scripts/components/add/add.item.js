'use strict';

angular.module('buildboardApp')
  .controller('AddItemCtrl', addItemCtrl);

function addItemCtrl($scope, filepickerService) {
  var items = this;
  items.details = [{
    icon: 'home',
    title: 'Property',
    info: 'Some info about properties',
    state: 'add.property.address'
  },
  {
    icon: 'perm_contact_calendar',
    title: 'Event',
    info: 'Add an event related to your properties on your calendar',
    state: 'add.event'
  },
  {
    icon: 'note_add',
    title: 'Note',
    info: 'Some info about notes',
    state: 'add.note'
  }];
}