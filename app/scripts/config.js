'use strict';

(function(angular) {
angular.module('buildboardApp')
  .config(function(filepickerProvider, authProvider, jwtInterceptorProvider, storeProvider, $httpProvider) {
    // Add the API key to use filestack service
    filepickerProvider.setKey('AbxbbjIjQuq0m1MnLf9n0z');
    // Auth0
    authProvider.init({
      domain: 'dremy.auth0.com',
      clientID: 'tZpbTxM4xajZMUjR804mRFNCzEMy2XA4',
      loginState: 'userLogin'
    });

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function($rootScope, $state, auth, store, jwtHelper) {
    //eventsHook
    auth.hookEvents();

    $rootScope.$on('$locationChangeStart', function() {
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
          } else {
            $state.go('userLogin');
          }
        }
      }
    });
  });
})(angular);
/*    
//Called when login is successful
authProvider.on('loginSuccess', function($state, profilePromise, idToken, store) {
  console.log("Login Success");
  profilePromise.then(function(profile) {
    store.set('profile', profile);
    store.set('token', idToken);
  });
  $state.go('home');
});

//Called when login fails
authProvider.on('loginFailure', function() {
  console.log("Error logging in");
  $state.go('userLogin');
});
*/