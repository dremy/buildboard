if (!process.env.STACK_ENV) {
  var env = require('./env.js');
}

// Shared env vars in all environments 
var shared = {
  filepickerKey: process.env.FILEPICKER_KEY,
  auth0ClientId: process.env.AUTH0_CLIENTID,
  googlePlacesKey: process.env.GOOGLE_PLACES_KEY,
  debug: process.env.DEBUG || true
};

// 
var environments = {
  local: {

  },
  development: {
    ENV_VARS: shared
  },
  staging: {
    ENV_VARS: shared
  },
  production: {
    ENV_VARS: shared
  }
};

module.exports = environments;