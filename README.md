# BuildBoard

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Initial Setup
Run `npm install` to install node & bower modules.
Create an `env.js` file to store specific environment variables.
Install mongodb with homebrew `brew install mongodb`
Run `node server.js`

## Build & development

Run `bower install [package-name] --save` to update bower.json
Run `bower update` to update bower_components
Run `grunt wiredep` to write bower_components to index.html

Run `grunt` for building, JS lint, and `grunt serve` for preview.

Go to `/services/session/token` to get new Services Session token.

## Testing

Running `grunt test` will run the unit tests with karma.
