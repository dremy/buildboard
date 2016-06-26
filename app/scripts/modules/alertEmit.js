/**
 * The alerting module.
 */
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
};


function alertEmit($rootScope, message) {
  var type;

  function alerting(message, type, dt) {// TO DO - Global solve.
    $scope.$emit('alert', { // Emit message.
      message: message,
      type: type,
      dt: dt
    });
    $rootScope.globals.isLoading = false; 
  }

  //ALERT - Success
  this.success = function () {
    type = 'success';
    return alerting(message, type, dt);
  }

  this.warning = function () {
    type = 'warning';
    return alerting(message, type, dt);
  }

  this.danger = function () {
    type = 'danger';
    return alerting(message, type, dt);
  }
}

angular.module('buildboardApp').
  service('alertEmit', ['$rootScope', alerting]);