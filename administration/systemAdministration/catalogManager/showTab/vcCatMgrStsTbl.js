(function () {
    'use strict';

    
    function vcShoCatalogManagerSystemTable(vcCatMgrSysTblListFactory) {
        return {
            // scope:false,
            restrict: 'E',
            templateUrl: 'app/catalogmanager/showTab/tabviews/vcCatMgrSysTbl.html',
            link: function (scope, element, attrs) {
                
                scope.getlist = vcCatMgrSysTblListFactory.getlist();
                
                scope.getlist.customGET().then(function (result) {
                    scope.TableDrpDwnList = result;
                });
            }
        };

    }

    angular.
        module('vitricon').
        directive('vcCatMgrSysTbl', vcShoCatalogManagerSystemTable);
})();
