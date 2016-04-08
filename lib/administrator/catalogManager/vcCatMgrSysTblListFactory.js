(function () {
    'use strict';

    
    function vcCatMgrSysTblList(Restangular) {
        var table = {};
        
        table.getlist = function(){
            
            var service = Restangular.service('/admin/catalog/system');



            service.customGET = function () {

                return Restangular.one('/admin/catalog/system').getList();

            };

         
            return service;

        };
        
        return table;
    }

    angular.
        module('vc_lib').
        factory('vcCatMgrSysTblListFactory', vcCatMgrSysTblList);

})();
