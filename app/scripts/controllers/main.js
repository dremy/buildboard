'use strict';

/**
 * @ngdoc function
 * @name buildboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the buildboardApp
 */
function MainCtrl($scope) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // Content!
  var rows = [
    {
      type: 'content-center',
      subheader: "What's Buildboard?",
      paragraphs: [
        {
          text: 'The collaboration platform where real estate investors get more done.'
        }
      ],
      class: 'container-first'
    },
    {
      type: 'media-left',
      subheader: 'Get More Done.',
      paragraphs: [
        {
          text: 'Keep tabs on your Portfolio.'
        },
        {
          text: 'Keep documents in one place.'
        },
        {
          text: 'Keep everyone in the loop.'
        }
      ],
      cta: {
        url: '#/user/register',
        icon: 'lock',
        text: 'See How'
      },
      image: {
        filename: 'dashboard.png',
        alt: 'Buildboard Tablet Dashboard',
        title: 'Buildboard Tablet Dashboard'
      }
    },
    {
      type: 'media-right',
      subheader: 'Save More Time.',
      paragraphs: [
        {
          text: 'Pull in your circle.'
        },
        {
          text: 'Share floor plans.'
        },
        {
          text: 'Post updates.'
        }
      ],
      cta: {
        url: '#/user/register',
        icon: 'lock',
        text: 'See How to Save Time'
      },
      image: {
        filename: 'dashboard.png',
        alt: 'Buildboard Desktop Dashboard',
        title: 'Buildboard Desktop Dashboard'
      }
    },
    {
      type: 'media-left',
      subheader: 'Share More Ideas.',
      paragraphs: [
        {
          text: 'Pull in your circle.'
        },
        {
          text: 'Share floor plans.'
        },
        {
          text: 'Post updates.'
        }
      ],
      cta: {
        url: '#/user/register',
        icon: 'lock',
        text: 'See How to Share'
      },
      image: {
        filename: 'tablet.png',
        alt: 'Buildboard Tablet Dashboard',
        title: 'Buildboard Tablet Dashboard'
      }
    },
    {
      type: 'media-right',
      subheader: 'Grow Your Network.',
      paragraphs: [
        {
          text: 'Find partners.'
        },
        {
          text: 'Review their track records.'
        },
        {
          text: 'Find service providers.'
        }
      ],
      cta: {
        url: '#/user/register',
        icon: 'lock',
        text: 'See How'
      },
      image: {}
    }
  ];

  $scope.rows = rows;
}



angular.module('buildboardApp')
  .controller('MainCtrl', MainCtrl);
