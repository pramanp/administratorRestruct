(function () {
    'use strict';

    
    function vcCatMgrCrossTblList(Restangular) {
        var table = {};
        
        table.getlist = function(){
            
            var service = Restangular.service('/admin/catalog/cross');



            service.customGET = function () {

                return Restangular.one('/admin/catalog/cross').getList();

            };

         
            return service;

        };
        
        return table;
    }

    angular.
        module('vc_lib').
        factory('vcCatMgrCrossTblListFactory', vcCatMgrCrossTblList);

})();
