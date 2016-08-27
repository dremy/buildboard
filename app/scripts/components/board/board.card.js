'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.component:card
 * @description
 * # Board Card Component
 * Controller of the buildboardApp
 */
function boardCardCtrl() {  
}

angular.module('bb.board')
  .component('boardCard', {
    templateUrl: 'scripts/components/board/board.card.html',
    controller: boardCardCtrl,
    bindings: {
      board: '<',
      property: '<'
    }
  });