'use strict';

function currentSpot() {
  // Sets defaults as empty
  var activeMenuId = '';
  var titleText = '';

  // Returns object with 3 operations 
  return {
    setCurrentSpot: function (menuId, title) {
      activeMenuId = menuId;
      titleText = title;
    },
    getActiveMenu: function () {
      return activeMenuId;
    },
    getTitle: function () {
      return titleText;
    }
  };
}

function bbActiveMenu(currentSpot) {
  return function(scope, element, attrs) {
    // Set values to attributes.
    var activeMenuId = attrs.bbActiveMenu; // attrs["bbActiveMenu"]
    var activeTitle = attrs.bbActiveTitle; // attrs['bbActiveTitle']
    // Reuse depending on the new values.
    currentSpot.setCurrentSpot(activeMenuId, activeTitle);
  };
}

angular.module('buildboardApp')
  .factory('currentSpot', currentSpot)
    // Allows you to format values for active menu and title.
  .directive('bbActiveMenu', bbActiveMenu);