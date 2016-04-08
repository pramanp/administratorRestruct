(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcLicenseGrid', vcLicenseGridDirective);

    function vcLicenseGridDirective(Session, $q) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            }
        };

        return ddo;

        function _prelinkfn(scope, el) {
            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                scrollX: true,
                selectable: false,
                deleteable: false
            };
            scope.events  = {
                
            };
            
            scope.columns = [
                {title: "sysadmin.license.grid.name", data: "mandtatorName"},
                {title: "sysadmin.license.grid.maxOperatorValue", data: "maxOperatorValue"},
                {title: "sysadmin.license.grid.maxConcurrentOperators", data: "maxConcurrentOperators"},
                {title: "sysadmin.license.grid.maxVitricadOperators", data: "maxVitricadOperators"}
            ];
           
            scope.read = function () {
               var deferment = $q.defer();
                    var gridData = Session.getGridData();
                    deferment.resolve(gridData);
                    return deferment.promise;
                };
            };
        function _postlinkfn() {
        }
    }

})();
