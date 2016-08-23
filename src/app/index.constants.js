/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('showPlans').constant('config', {
    applicationId: 'com.showplan',
    restAPIKey: '8q3VSq0p1yLg02u9a7QEtRuClXU2B79uPswvZrua',
    localserver:'localhost:1337/parse',
    remoteServer:'showplan.herokuapp.com/parse',
    protocol:'http://'



    //'https://ec2-52-17-125-135.eu-west-1.compute.amazonaws.com/api/admin/survey/'
    //  http://auratrend.co.uk/
  });

})();
