(function () {
  'use strict';

  angular
    .module('showPlans')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  function ModalInstanceCtrl($scope, $uibModalInstance, csvData,header) {
    $scope.csvData = csvData;
    $scope.header=header;
    console.log('$scope.header');
    console.log($scope.header);


    $scope.ok = function () {
      $uibModalInstance.close({data:csvData,header:header});
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
