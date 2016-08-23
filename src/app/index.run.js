(function() {
  'use strict';

  angular
    .module('showPlans')
    .run(runBlock);

  /** @ngInject */
  function runBlock(config,$http) {

    $http.defaults.headers.common['X-Parse-Application-Id'] = config.applicationId;

    $http({
      method: 'GET',
     // headers:{'X-Parse-Application-Id':config.applicationId},
      url: 'http://localhost:1337/parse/classes/GameScore'
    }).then(function successCallback(response) {
      console.log('SUCCO');
      console.log(response);
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      console.log('ERRO');
      console.log(response);
    });

    console.log('runblock');
    console.log(config.applicationId);
  }

})();
