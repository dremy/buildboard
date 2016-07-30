'use strict';

function messaging(message) {
  message = 'Check this out!';

  //ALERT - Success
  this.success = function() {
    type = 'success';
    return console.log(type);
  };

  this.warning = function() {
    type = 'warning';
    return console.log(type);
  };

  this.danger = function() {
    type = 'danger';
    return console.log(type);
  };
}

angular.module('bb.message')
  .service('messaging', [messaging])
  .value('message','');

/*function messaging(currentUser, reason) {
  this.login = {
    success: 'Welcome back ' + currentUser.name.given + '!',
    failure: ''
  };
  
  this.register = {
    success: '',
    failure: ''
  };

  this.property_load = {
    failure: 'Adding failed due to ' + reason.statusText + '. Try again later.'
  };
}
 
//TO DO - New Message service.
var message = {
  login: {
    success: '',
    failure: ''
  },
  register: {
    success: '',
    failure: ''
  },
  userProfile: {
    edit: {
      success: '',
      failure: ''
    }
  },
  property:{
    add: {
      success: '',
      failure: ''
    },
    edit: {
      success: '',
      failure: ''
    },
    delete: {
      success: '',
      failure: ''
    }
  }
};*/