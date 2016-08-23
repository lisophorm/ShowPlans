'use strict';

angular.module('showPlans')

  .directive('csvTable', function($http) {
    return {
      restrict: 'E',
      templateUrl:'app/scripts/csvTable.template..html',
      replace: true,
      scope: {
        data: '=',
        header:'='
      },
      controller:function($scope) {
        $scope.columns=[];
        if($scope.header) {
          // could do a little checks here
          for (var k in $scope.data[0]) {
            $scope.columns.push(k);
          }
        }
      }
    };
  });
