(function () {
    'use strict';

    
    function vcGetCatMgrCrossTblEditDesc(Restangular) {
        var crossTable = {};
        
        crossTable.getEditTableDesc = function(){
            
            var service = Restangular.service('/admin/catalog/cross/edit_table');

            return service;

        };
        
        return crossTable;
    }

    angular.
        module('vc_lib').
        factory('vcGetCatMgrCrossTblEditDescFactory', vcGetCatMgrCrossTblEditDesc);

})();
