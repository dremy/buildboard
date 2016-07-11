'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the buildboardApp
 */
function ProposalCtrl($rootScope, $scope, $routeParams, drupal) {

  function addOption() {
    $scope.proposal.options.push({
      financingType: 'Mortgage',
      amountRaised: 0,
      terms: 360,
      rate: 4,
      down: 0,
      origination: 0
    });
  }

  function calculate(i) {
    var opRate = $scope.proposal.options[i].rate/100/12;
    var opTerms = $scope.proposal.options[i].terms;
    var powerOfOpRateAndTerms = Math.pow(1+opRate, opTerms);
    var opAmount = $scope.proposal.options[i].amountRaised - $scope.proposal.options[i].down;  
    switch ($scope.proposal.options[i].financingType) {
      case 'Mortgage':
        var multiplier = (opRate*powerOfOpRateAndTerms)/(powerOfOpRateAndTerms - 1);
        var monthlyPayment = multiplier * opAmount;
      break;
      case 'Hard Money':
        var totalPayment = (opAmount * powerOfOpRateAndTerms) - opAmount;
        var monthlyPayment = totalPayment/opTerms;
      break;
    }

    $scope.proposal.options[i].monthlyPayment = monthlyPayment;
    $scope.proposal.options[i].totalPayment = totalPayment;
  }

  function sumRaised(index) {
    $scope.proposal.totalRaised = 0;
    for (var i = 0; i < $scope.proposal.options.length; i++) {
      if ($scope.proposal.options[i].amountRaised) {
        $scope.proposal.totalRaised += $scope.proposal.options[i].amountRaised;
      }
    };
    calculate(index);
  }

  function setView(view) {
    $scope.view = view;
    console.log(view);
  }

  var proposal = {
    title: '',
    targetAmount: 0,
    totalRaised: 0,
    options: [{
      financingType: 'Mortgage',
      amountRaised: 0,
      terms: 360,
      rate: 4,
      down: 0,
      origination: 0
    }]
  };

  var query = {
    parameters: {
      'type': 'proposal'
    }
  };

  drupal.entity_node_index(query) // TO DO: .success(fn).error(fn)
    .then(function (nodes) { // Success!
      // $scope.proposals = nodes; // Display
      var proposals = nodes; // TO DO: necessary?
      var nextProposal = 1;

      if (proposals.length) {
        for (var i = 0; i < proposals.length; i++) {
          nextProposal++;
        };
        $scope.proposal.title = 'Proposal #' + nextProposal;
      }
      console.log('doing something');
      $rootScope.globals.isLoading = false; // No more loading spinner
    }, function (reason) { // Error...
      console.log(reason);
      $scope.message = "Why you no like me... " + reason.statusText;
      $rootScope.globals.isLoading = false; // No more loading spinner
    });

  setView('Start');
  $scope.setView = setView;
  $scope.proposal = proposal;
  $scope.sumRaised = sumRaised;
  $scope.addOption = addOption;
  $scope.calculate = calculate;
}


angular.module('buildboardApp')
  .controller('ProposalCtrl', ProposalCtrl);