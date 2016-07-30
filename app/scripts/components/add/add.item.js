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
    icon: 'note_add',
    title: 'Note',
    info: 'Some info about notes',
    state: 'add.note'
  }];

  items.superhero = {};
  //Send the newly created superhero to the server to store in the db
  function createSuperhero() {
    console.log(items.superhero);
    /*$http.post('/superhero', items.superhero)
      .success(
        function(data){
            console.log(JSON.stringify(data));
            //Clean the form to allow the user to create new superheroes
            items.superhero = {};
        }
      )
      .error(function(data) {
            console.log('Error: ' + data);
        }
      );*/
  }

  //Single file upload, you can take a look at the options
  function upload() {
    filepickerService.pick(
      {
        mimetype: 'image/*',
        language: 'en',
        services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
        openTo: 'IMAGE_SEARCH'
      },
      function(Blob){
        console.log(Blob);
        items.superhero.picture = Blob;
        $scope.$apply();
      }
    );
  }

  //Multiple files upload set to 3 as max number
  function uploadMultiple() {
    filepickerService.pickMultiple(
      {
        mimetype: 'image/*',
        language: 'en',
        maxFiles: 3, //pickMultiple has one more option
        services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
        openTo: 'IMAGE_SEARCH'
      },
      function(Blob){
        items.superhero.morePictures = Blob;
        $scope.$apply();
      }
    );
  }

  items.createSuperhero = createSuperhero;
  items.upload = upload;
  items.uploadMultiple = uploadMultiple;
}