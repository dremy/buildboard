'use strict';
/**
 * @ngdoc overview
 * @name buildboardApp.routes
 * @description
 * # buildboardApp.routes
 *
 * The source of all routes/states for the application.
 */

var componentsDir = 'scripts/components';

// Main App
//--------------------------
angular.module('buildboardApp')
  .config(function($stateProvider, $urlRouterProvider, filepickerProvider) {
    $stateProvider   //TO DO - Do not allow logged in users to go to /user/login OR /user/register
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('features', {
        url: '/features',
        templateUrl: 'views/features.html',
        controller: 'FeaturesCtrl',
        controllerAs: 'features'
      })
      .state('benefits', {
        url: '/benefits',
        templateUrl: 'views/benefits.html',
        controller: 'BenefitsCtrl',
        controllerAs: 'benefits'
      })
      .state('howItWorks', {
        url: '/how-it-works',
        templateUrl: 'views/how-it-works.html',
        controller: 'HowWorksCtrl',
        controllerAs: 'howworks'
      })
      .state('userLogin', {
        url: '/user/login',
        templateUrl: 'scripts/components/user/user.login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('userRegister', {
        url: '/user/register',
        templateUrl: 'scripts/components/user/user.register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .state('add', {
        url:'/add',
        templateUrl: 'scripts/components/add/add.html',
      })
      .state('add.item', {
        url: '/item',
        templateUrl: 'scripts/components/add/add.item.html',
        controller: 'AddItemCtrl',
        controllerAs: 'items'
      })
      .state('add.property', {
        url:'/property',
        templateUrl: 'scripts/components/add/add.property.html',
        controller: 'AddPropertyCtrl',
        controllerAs: 'property'
      })
      .state('add.property.address', {
        url:'/address',
        templateUrl: 'scripts/components/add/add.property.address.html',
      })
      .state('add.property.confirm', {
        url:'/confirm',
        templateUrl: 'scripts/components/add/add.property.confirm.html',
      })
      .state('add.property.relationship', {
        url:'/relationship',
        templateUrl: 'scripts/components/add/add.property.relationship.html',
      })
      .state('accountEdit', {
        url: '/user/:uid/edit',
        templateUrl: 'scripts/components/user/user.edit.html',
        controller: 'UserEditCtrl',
        controllerAs: 'user'
      })
      .state('account', {
        url:'/user/:uid',
        resolve: {
          account: ['$stateParams', 'drupal', 'messages','alert', 
            function ($stateParams, drupal, messages, alert) {
              if ($stateParams.uid) {
                return drupal.user_load($stateParams.uid);
              } else {
                  alert.message = "Can't pull user account details. Refresh the page to try again.";
                  alert.type = 'danger';
                  messages.add(alert.message, alert.type, alert.dt);
              }
          }]
        },
        templateUrl: 'scripts/components/user/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: 'scripts/components/portfolio/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'portfolio'
      })
      /*.('portfolio.map', {
        templateUrl: 'scripts/components/portfolio/portfolio.map.html',
        controller: 'PortfolioCtrl',

      })*/
      .state('property', { // Property Profile
        url: '/property/:nid',
        resolve: {
          property: ['$stateParams', 'drupal', 
            function ($stateParams, drupal) {
              return drupal.node_load($stateParams.nid);
            } 
          ]
        },
        templateUrl: componentsDir + '/property/property.html',
        controller: 'PropertyCtrl',
        controllerAs: 'property'
      })
      .state('propertyEditForm', {
        url:'/property/:nid/edit',
        templateUrl: componentsDir + '/property/property.edit.html',
        controller: 'PropertyEditCtrl',
      })
      /*.when('/property/:nid/documents', {
        templateUrl: 'views/documents.html',
        controller: 'DocumentsCtrl',
        controllerAs: 'documents'
      })*/
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('addProposal', { //TO DO - Very temporary
        url: '/addProposal',
        templateUrl: 'views/addProposal.html',
        controller: 'ProposalCtrl',
        controllerAs: 'proposal'
      });

    // Catch all route
    $urlRouterProvider.otherwise('/');
    // Add the API key to use filestack service
    filepickerProvider.setKey('AbxbbjIjQuq0m1MnLf9n0z');
  });