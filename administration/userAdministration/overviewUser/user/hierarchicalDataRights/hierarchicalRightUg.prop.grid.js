(function () {
    'use strict';

    angular.module('vitricon').directive('vcSysuserHierarchicalRightPropGrid', hierarchicalRightPropGridDirective);

    function hierarchicalRightPropGridDirective(SystemUser, $stateParams) {
        var ddo = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            }
        };

        return ddo;

        function _prelinkfn(scope, el, attr) {
            var table = null;
            var grid = null;
            var rowsChanged = {};
            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                selectable: false,
                deleteable: false
            };

            scope.init = function (api) {
                grid = api;
                table = $(grid.table().node());

                table.find('tbody').on('click', 'input.select-right', function (event) {
                    var $row = $(this).closest('tr');
                    var rowIndex = grid.row($row).index();
                    if(_.isUndefined(rowsChanged[rowIndex]))
                        rowsChanged[rowIndex] = false;

                    rowsChanged[rowIndex] = $(this).is(':checked');
                });
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "admin.usergroups.hdatarights.grid.restricted", data: "accessAllowed",
                    orderable: false,
                    render: function (data) {
                        if (data) {
                            return '<input class="select-right" type="checkbox" checked/>';
                        } else {
                            return '<input class="select-right" type="checkbox"/>';
                        }
                    }
                },
                {title: "admin.usergroups.hdatarights.grid.administrator", data: "administrator"},
                {title: "admin.usergroups.hdatarights.grid.propertyname", data: "propertyName"},
            ];

            scope.read = function (data) {
                return SystemUser.getDataRights($stateParams.userdata, {isAssigned: true});
            };

            scope.$on('save_propertysu_rights', function () {
                if (rowsChanged.length === 0) return;
                var dataObject = [];
                _.each(rowsChanged, function(val, key){
                    var temp = grid.row(key).data();
                    temp.accessAllowed = val;
                    dataObject.push(temp);
                });

                SystemUser.saveDataRights(dataObject);
                rowsChanged = [];
            });

        }

        function _postlinkfn() {
        }
    }

})();
