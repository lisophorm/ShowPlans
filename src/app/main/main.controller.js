(function () {
  'use strict';

  angular
    .module('showPlans')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $uibModal, $timeout, csvService, Upload, config) {
    var vm = this;

    vm.ciao = "cio";
    vm.showError = false;
    vm.ErrorMessage = "";

    vm.tableLoaded = false;
    vm.exCeedFunc = exCeedFunc;
    vm.deleteTable = deleteTable;

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

      //$('.csv-table').fadeTo("slow" , 0.8);

      csvService.list()
        .then(function (tasks) {
          console.log('tasks');
          console.log(tasks);
          vm.tables = tasks;
          console.log('vm.tables');
          console.log(vm.tables);
          $timeout(function () {
            console.log('render complete');
            $('.csv-table').fadeTo("slow" , 0.1);
          });

        });
    }

    renderTables();

    console.log('main controller');

    function exCeedFunc() {
      console.log('i am gino exceed');
      $scope.$apply(function () {
        vm.ErrorMessage = "Maximum file size: " + $scope.csv.acceptSize + "Kb";
        vm.showError = true;
      })

      $timeout(function () {
        vm.showError = false;
        console.log('update with timeout fired');
      }, 10000);
    }

    function gino() {
      console.log('i am gino');
    }

    function CSVCallback() {
      console.log('calla');
      console.log($scope.csv.header);
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
        console.log('save data')
        console.log(csvData);
        csvService.create(csvData)
          .then(function (tasks) {
            console.log('created tasks');
            console.log(tasks);
            renderTables();
            //$scope.tasks = $scope.tasks.concat(tasks);
          });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    function deleteTable(id) {
      console.log('Delete table ' + id);
      csvService.remove(id).then(
        function (success) {
          console.log('table deleted');
          renderTables();
        }, function (error) {
          console.log('error');
          console.log(error);
        }
      )
    }

  }
})();
