(function () {
    'use strict';

    angular.
    module('vitricon').
    directive('vcAdminMandatorsGrid', vcAdminMandatorsGridDirective);

    function vcAdminMandatorsGridDirective(Mandator, $state, Messaging, $q, $timeout) {
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
                filter: false,
                scrollX: true
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "admin.mandators.grid.loginname", data: "designator",
                    render: function (data) {
                        return '<a class="select-row">' + data + '</a>';
                    }, editable: false
                },
                {title: "admin.mandators.grid.countArticle", data: "countOperator", editable: false},
                {title: "admin.mandators.grid.countInventory", data: "countAdministration", editable: false},
                {title: "admin.mandators.grid.countDocument", data: "countArticle", editable: false},
                {title: "admin.mandators.grid.countDocumentLevel", data: "countInventory", editable: false},
                {title: "admin.mandators.grid.token", data: "countDocument", editable: false},
                {title: "admin.mandators.grid.notes", data: "countDocumentLevel", editable: false},
                {title: "admin.mandators.grid.countOrganisation", data: "countOrganisation", editable: false}
            ];

            scope.read = function (data) {
                return Mandator.getList();
            };

            scope.onSelect = function (data, index) {
                $state.go('main.mandator', {userdata: data.dbId});
            };

            scope.delete = function (data) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you really want to delete this mandator?', function (val) {
                        if (val === 'ok') {
                            Mandator.one(data.dbId).customDELETE().then(function (response) {
                                deferment.resolve(response);
                                scope.$broadcast('refresh_all');
                                scope.$emit('refresh_tree', {action: 'delete', key: 'man/' + data.dbId});
                            });
                        }
                    });
                }, 1000);
            };

            scope.update = function (data) {
//                if (data.dbId === null) {
//                    delete data.dbId;
//                    Mandator.post(data);
//                } else {
//                    Mandator.one(data.dbId).customPUT(data);
//                }
            };

            scope.editor = {
                defaultRow: function () {
                    return {
                        "dbId": null,
                        "designator": "",
                        "description": "",
                        "countOperator": "",
                        "countAdministration": "",
                        "countArticle": "",
                        "countInventory": "",
                        "countDocument": "",
                        "countDocumentLevel": "",
                        "countOrganisation": "",
                        "token": '',
                        "notes": ''
                    };
                }
            };
        }

        function _postlinkfn(scope, el, attr, ctrl) {
        }
    }

})();
