(function() {
  'use strict';

  angular
    .module('showPlans')
    .config(config);

  /** @ngInject */
  function config(config) {
    console.log('run config');
    console.log(config.applicationId);
    if(window.location.href.indexOf("localhost") > -1) {
      config.basePath = config.protocol+config.localserver;
    } else {
      var base = config.protocol+config.remoteServer;
    }
  }

})();
