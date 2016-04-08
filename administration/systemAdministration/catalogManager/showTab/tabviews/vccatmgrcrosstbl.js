(function () {
    'use strict';

    
    function vcShoCatalogManagerCrossTable(vcCatMgrCrossTblListFactory) {
        return {
            // scope:false,
            restrict: 'E',
            templateUrl: 'app/catalogmanager/showTab/tabviews/vccatmgrcrosstbl.html',
            link: function (scope, element, attrs) {
                
                scope.getlist = vcCatMgrCrossTblListFactory.getlist();
                
                scope.getlist.customGET().then(function (result) {
                    scope.TableDrpDwnList = result;
                });
            }
        };

    }

    angular.
        module('vitricon').
        directive('vcCatMgrCrossTbl', vcShoCatalogManagerCrossTable);
})();
