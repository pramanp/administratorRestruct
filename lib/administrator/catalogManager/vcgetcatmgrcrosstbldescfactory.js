(function () {
    'use strict';

    
    function vcGetCatMgrCrossTblDesc(Restangular) {
        var systemTable = {};
        
        systemTable.getTableDesc = function(){
            
            var service = Restangular.service('/admin/catalog/cross');

            service.customGET = function (tableId,param) {

                return Restangular.one('/admin/catalog/cross',tableId).get(param);

            };
         
            return service;

        };
        
        systemTable.getSwitchTableDesc = function(){
            
            var service = Restangular.service('/admin/catalog/cross/switch_table');

            service.customGET = function (tableId,param) {

                return Restangular.one('/admin/catalog/cross/switch_table',tableId).get(param);

            };
         
            return service;

        };        
        
        return systemTable;
    }

    angular.
        module('vc_lib').
        factory('vcGetCatMgrCrossTblDescFactory', vcGetCatMgrCrossTblDesc);

})();
