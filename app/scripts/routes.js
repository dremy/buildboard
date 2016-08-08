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
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, authProvider) {
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
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('howItWorks', {
        url: '/how-it-works',
        templateUrl: 'views/how-it-works.html',
        controller: 'HowWorksCtrl',
        controllerAs: 'howworks'
      })
      .state('userLogin', {
        url: '/user/login',
        templateUrl: componentsDir + '/user/user.login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('userRegister', {
        url: '/user/register',
        templateUrl: componentsDir + '/user/user.register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .state('add', {
        url:'/add',
        templateUrl: componentsDir + '/add/add.html',
        data: {
          requiresLogin: true
        }
      })
      .state('add.item', {
        url: '/item',
        templateUrl: componentsDir + '/add/add.item.html',
        controller: 'AddItemCtrl',
        controllerAs: 'items'
      })
      .state('add.property', {
        url:'/property',
        templateUrl: componentsDir + '/add/add.property.html',
        controller: 'AddPropertyCtrl',
        controllerAs: 'property'
      })
      .state('add.property.address', {
        url:'/address',
        templateUrl: componentsDir + '/add/add.property.address.html',
      })
      .state('add.property.confirm', {
        url:'/confirm',
        templateUrl: componentsDir + '/add/add.property.confirm.html',
      })
      .state('add.property.relationship', {
        url:'/relationship',
        templateUrl: componentsDir + '/add/add.property.relationship.html',
      })
      .state('add.board', {
        url: '/board',
        templateUrl: componentsDir + '/add/add.board.html',
        controller: 'BoardCtrl',
        controllerAs: 'board'
      })
      .state('accountEdit', {
        url: '/user/:uid/edit',
        data: {
          requiresLogin: true
        },
        templateUrl: componentsDir + '/user/user.edit.html',
        controller: 'UserEditCtrl',
        controllerAs: 'user'
      })
      .state('account', {
        url:'/user',
        data: {
          requiresLogin: true
        },
        templateUrl: componentsDir + '/user/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .state('portfolio', {
        url: '/portfolio',
        data: {
          requiresLogin: true
        },
        resolve: {
          properties: ['relationshipService', 'auth', function(relationshipService, auth) {
            var _user = {
              _user: auth.profile.user_id
            };
            return relationshipService.queryRelationshipsProperties(_user);
          }]
        },
        templateUrl: componentsDir + '/portfolio/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'portfolio'
      })
      .state('property', { // Property Profile
        url: '/property/:id',
        data: {
          requiresLogin: true
        },
        resolve: {
          prop: ['relationshipService', '$stateParams', 'auth',
            function(relationshipService, $stateParams, auth) {
              var query = {
                _user: auth.profile.user_id,
                _property: $stateParams.id
              };
              return relationshipService.queryRelationshipsProperties(query);
            }
          ]          
        },
        templateUrl: componentsDir + '/property/property.html',
        controller: 'PropertyCtrl',
        controllerAs: 'property'
      })
      .state('propertyEditForm', {
        url:'/property/:id/edit',   
        templateUrl: componentsDir + '/property/property.edit.html',
        resolve: {
          prop: ['$stateParams', 'propertyService', 
            function ($stateParams, propertyService) {
              return propertyService.getPropertyById($stateParams.id);
            }
          ]
        },
        controller: 'PropertyEditCtrl',
        controllerAs: 'property'
      })
      .state('propertyDeleteForm', {
        url:'/property/:id/remove',   
        templateUrl: componentsDir + '/property/property.delete.html',
        resolve: {
          prop: ['$stateParams', 'propertyService', 
            function ($stateParams, propertyService) {
              return propertyService.getPropertyById($stateParams.id);
            }
          ]
        },
        controller: 'PropertyDeleteCtrl',
        controllerAs: 'property'
      })
      .state('addProposal', { //TO DO - Very temporary
        url: '/addProposal',
        templateUrl: 'views/addProposal.html',
        controller: 'ProposalCtrl',
        controllerAs: 'proposal'
      });

    // Catch all route
    $urlRouterProvider.otherwise('/');
  });
