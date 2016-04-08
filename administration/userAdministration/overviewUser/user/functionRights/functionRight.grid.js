(function () {
    'use strict';

    angular.module('vitricon').directive('vcSysuserFunctionalRightGrid', FunctionalRightGridDirective);

    function FunctionalRightGridDirective(SystemUser, $stateParams) {
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
            var tree;
            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                paging: false,
                deleteable: false
            };

            scope.init = function (api) {
                //tree = api;
                tree = $(el.find('.tree-menu')).fancytree('getTree');
            };
            scope.events = {
                refresh_all: 'admin.user.grid.js_grid_all',
                refresh_row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "admin.usergroups.grid.name", data: "name"},
                {title: "admin.usergroups.grid.designator", data: "designator"},
                {title: "admin.usergroups.grid.assignmentlevel", data: "assignedToGroup",
                    render: function(data, type) {
                        return data === true ? 'UserGroup' : "User";
                    }
                }
            ];

            scope.read = function (data) {
                return SystemUser.getAssignedFunctionRights($stateParams.userdata);
            };

            scope.onSelect = function (data, index) {

            };

            scope.$on('refresh_functionsu_rights', function () {
                scope.$broadcast(scope.events.refresh_all);
            });
        }

        function _postlinkfn() {
        }
    }

})();
