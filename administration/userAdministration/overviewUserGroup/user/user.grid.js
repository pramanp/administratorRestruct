(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcUserGroupUserGrid', UsergroupUserGridDirective);

    function UsergroupUserGridDirective(User, $log) {
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
                editable: true,
                exportable: true,
                filter: false
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "admin.usergroups.grid.name", data: "designator"},
                {title: "admin.usergroups.grid.note", data: "note"},
                {title: "admin.usergroups.grid.createddate", data: "createdDate"},
                {title: "admin.usergroups.grid.description", data: "description"}
            ];

            scope.read = function (data) {
                return User.getList();
            };

            scope.onSelect = function (data, index) {

            };

            scope.update = function(data) {
                $log.info(data);
            };



        }

        function _postlinkfn() {
        }
    }

})();
