angular
  .module('showPlans')
  .service('utilsService', function utilsService($q, $http) {
    this.getPromise = function (httpConfig) {
      var defer = $q.defer();

      $http(httpConfig)
        .success(function () {
          defer.resolve.apply(this, arguments);
        })
        .error(function () {
          defer.reject.apply(this, arguments);
        });

      return defer.promise;
    };
  });
