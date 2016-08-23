(function () {
  'use strict';

  angular
    .module('showPlans')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $uibModal, $timeout, csvService, Upload, config) {
    var vm = this;

    vm.showError = false;
    vm.ErrorMessage = "";

    vm.tableLoaded = false;
    vm.deleteTable=deleteTable;

    $scope.csv = {
      content: null,
      header: false,
      headerVisible: true,
      separator: ',',
      separatorVisible: true,
      result: null,
      encoding: 'ISO-8859-1',
      encodingVisible: true,
      accept: ".csv",
      acceptSize: 2048,
      callback: CSVCallback,
      exCeedFunc: exCeedFunc
    };

    function renderTables() {

      csvService.list()
        .then(function (tasks) {
          console.log('tasks');
          console.log(tasks);
          vm.tables = tasks;
          console.log('vm.tables');
          console.log(vm.tables);
          $timeout(function () {
            // some shit for cloaking

          });

        });
    }

    renderTables();


    function exCeedFunc() {
      $scope.$apply(function () {
        vm.ErrorMessage = "Maximum file size: " + $scope.csv.acceptSize + "Kb";
        vm.showError = true;
      });

      $timeout(function () {
        vm.showError = false;
        console.log('update with timeout fired');
      }, 10000);
    }

    function CSVCallback() {
      openModal();
    }

    function openModal() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/partials/modal.template.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          header: function () {
            return $scope.csv.header;
          },
          csvData: function () {
            return $scope.csv.result;
          }
        }
      });

      modalInstance.result.then(function (csvData) {

        console.log(csvData);
        csvService.create(csvData)
          .then(function (tasks) {
            renderTables();
          });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    function deleteTable(id) {
      console.log
      csvService.remove(id).then(
        function (success) {
          renderTables();
        }, function (error) {
          console.log(error);
        }
      )
    }

  }
})();
