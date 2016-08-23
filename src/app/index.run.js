(function() {
  'use strict';

  angular
    .module('showPlans')
    .run(runBlock);

  /** @ngInject */
  function runBlock(config,$http) {

    $http.defaults.headers.common['X-Parse-Application-Id'] = config.applicationId;


  }

})();
