(function () {
    'use strict';

    
    function vcShoCatalogManagerSystemTable(vcCatMgrCustTblListFactory) {
        return {
            // scope:false,
            restrict: 'E',
            templateUrl: 'app/catalogmanager/showTab/tabviews/vcCatMgrCustTbl.html',
            link: function (scope, element, attrs) {
                
                scope.getlist = vcCatMgrCustTblListFactory.getlist();
                
                scope.getlist.customGET().then(function (result) {
                    scope.TableDrpDwnList = result;
                });
            }
        };

    }

    angular.
        module('vitricon').
        directive('vcCatMgrCustTbl', vcShoCatalogManagerSystemTable);
})();
