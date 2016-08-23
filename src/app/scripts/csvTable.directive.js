'use strict';

angular.module('showPlans')

  .directive('csvTable', function($http) {
    return {
      restrict: 'E',
      templateUrl:'app/scripts/csvTable.template..html',
      replace: true,
      //bindToController: true,
      scope: {
        data: '=',
        header:'='
      },
      controller:function($scope) {

        $scope.columns=[];
        if($scope.header) {
          for (var k in $scope.data[0]) {
            $scope.columns.push(k);
          }
        }
        console.log('columns');
        console.log($scope.columns);
        console.log('header');
        console.log($scope.header);
        console.log('data');
        console.log($scope.data);
       // $scope.data={cacca:['ciao','ciao']}
      }
    };
  });
