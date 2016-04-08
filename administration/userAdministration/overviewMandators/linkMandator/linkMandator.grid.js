(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcLinkMandatorGrid', LinkMandatorDirective);

    function LinkMandatorDirective(Mandator) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            controller: 'LinkMandatorController'
        };

        return ddo;

        function _prelinkfn(scope, el) {
            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                deleteable: false
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "", data: "",
                    render: function (data) {
                        return '<a class="select-row"><input class="select-row" type="checkbox" readonly="readonly" value=""/></a>';
                    },editable: false
                },
                {title: "admin.usergroups.linkmandator.user", data: "operatorName", editable: false},
                {title: "admin.usergroups.linkmandator.groups", data: "groups", editable: false},
                {title: "admin.usergroups.linkmandator.mandator", data: "mandant", editable: false}
            ];

            scope.read = function (data) {
                return Mandator.one('system_users').customGET();
            };

            scope.onSelect = function (data, index) {
                scope.oId.push(data.oId);
            };
        }

        function _postlinkfn(scope) {
        }
    }

})();
