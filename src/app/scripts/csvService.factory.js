
  'use strict';

  angular
    .module('showPlans')
    .factory('csvService', function ($http, $q, utilsService,config) {
      // Public API here
      return {
        list: function () {
          var def = $q.defer();
          utilsService.getPromise({
            method: 'GET',
            params: {
              'order': '-createdAt'
            },
            url: config.basePath+'/classes/csv'
          }).then(function (data){
            def.resolve(fromMongo(data));
          },function(erro) {
            def.reject(erro);
          });
          return def.promise;
        },

        get: function (id) {
          return utilsService.getPromise({
            method: 'GET',
            url: config.basePath+'/classes/csv/' + id
          });
        },

        update: function (csv) {
          return utilsService.getPromise({
            method: 'PUT',
            data: csv,
            url: config.basePath+'/classes/csv/' + csv.objectId
          });
        },

        remove: function (objectId) {
          console.log('remove');
          console.log(objectId);
          return utilsService.getPromise({
            method: 'DELETE',
            url: config.basePath+'/classes/csv/' + objectId
          });
        },

        create: function (csv) {
          var self = this;
          var defer = $q.defer();
          console.log('create');
          console.log(csv);
          var createPromise = utilsService.getPromise({
            method: 'POST',
            url: config.basePath+'/classes/csv',
            data: toMongo(csv)
          });

          createPromise.then(function (csv) {
            self.get(csv.objectId)
              .then(function () {
                defer.resolve.apply(this, arguments);
              });
          });

          return defer.promise;
        }

      };
      function toMongo(csv) {
        console.log('toMongo');
        console.log(csv);
        var csvObject={};
        if(csv.header) {
          csvObject.header=true;
        } else {
          csvObject.header=false;
        }
        csvObject.data=JSON.stringify(angular.copy(csv.data));
        console.log(csvObject);
        return csvObject;
      }
      function fromMongo(csv) {
        console.log('fmMongo');
        console.log(csv);
        var csvArr=[];
        for(var i=0;i<csv.results.length;i++) {
          var current=csv.results[i];
          try {
            csvArr.push({
              id:current.objectId,
              header:current.header,
              data:JSON.parse(current.data),
              createdAt:current.createdAt
            });
          } catch (e) {
            console.log('ERROIN');
            console.log(e);
          }
        }
        return csvArr;
      }
    });


