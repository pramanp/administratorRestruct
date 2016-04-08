(function () {
    'use strict';

    
    function vcCatMgrCustTblList(Restangular) {
        var table = {};
        
        table.getlist = function(){
            
            var service = Restangular.service('/admin/catalog/custom');



            service.customGET = function () {

                return Restangular.one('/admin/catalog/custom').getList();

            };

         
            return service;

        };
        
        return table;
    }

    angular.
        module('vc_lib').
        factory('vcCatMgrCustTblListFactory', vcCatMgrCustTblList);

})();
