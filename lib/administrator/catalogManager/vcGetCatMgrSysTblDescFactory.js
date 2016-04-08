(function () {
    'use strict';

    
    function vcGetCatMgrSysTblDesc(Restangular) {
        var systemTable = {};
        
        systemTable.getTableDesc = function(){
            
            var service = Restangular.service('/admin/catalog');

            service.customGET = function (tableId) {

                return Restangular.one('/admin/catalog',tableId).get();

            };
         
            return service;

        };
        
        return systemTable;
    }

    angular.
        module('vc_lib').
        factory('vcGetCatMgrSysTblDescFactory', vcGetCatMgrSysTblDesc);

})();
