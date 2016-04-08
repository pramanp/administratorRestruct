(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcFunctionalRightGrid', FunctionalRightGridDirective);

    function FunctionalRightGridDirective(User, $stateParams) {
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
                paging:false,
                deleteable: false
            };
            scope.events = {
                refresh_all: 'admin.ug_function_right.grid.js_grid_all',
                refresh_row: 'admin.ug_function_right.grid.js_grid_row'
            };
            scope.columns = [
                {title: "admin.usergroups.grid.functionright", data: "name"},
                {title: "admin.usergroups.grid.description", data: "designator"}
            ];

            scope.read = function (data) {
                return User.getAssignedFunctionRights($stateParams.userdata);
            };

            scope.onSelect = function (data, index) {

            };

            scope.$on('refresh_function_rights', function(){
                scope.$broadcast(scope.events.refresh_all);
            });
        }

        function _postlinkfn() {
        }
    }

})();
