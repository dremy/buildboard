'use strict';

angular.module('bb.alert',[])
  .controller('AlertingCtrl', alertingCtrl)
  .factory('messages', messages)
  .value('alert', {
    message: '',
    type: {
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      info: 'info'
    },
    dt: 3000
    }
  );

function alertingCtrl(messages) {

  // Close alert.
  function closeAlert(index) {
    this.alerts.splice(index, 1);
  };

  this.alerts = messages.list;
  this.closeAlert = closeAlert;
}

function messages() {
  messages = {}
  messages.list = [];
  messages.add = (message, type, dt = 3000) => {
    messages.list.push(
      {
        id: messages.list.length,
        message: message,
        type: type,
        dt: dt
      }
    );
  };

  return messages;
};