(function () {
    'use strict';

    angular.module('vitricon').directive('vcSysuserCatalogueRights', vcUsergroupCatalogueRights);

    function vcUsergroupCatalogueRights(SystemUser, $stateParams) {
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
            var grid;
            var table;
            var rowsChanged = {};
            scope.init = function (api) {
                grid = api;
                table = $(grid.table().node());

                table.find('tbody').on('click', 'input.cdataright-select', function (event) {
                    var $row = $(this).closest('tr');
                    var rowIndex = grid.row($row).index();
                    if(_.isUndefined(rowsChanged[rowIndex]))
                        rowsChanged[rowIndex] = false;

                    rowsChanged[rowIndex] = $(this).is(':checked');
                });
            };
            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                selectable: false,
                deleteable: false
            };
            scope.events = {
                refresh_all: 'admin.usergrop-cataloguerights.grid.js_grid_all',
                refresh_row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "admin.usergroups.hdatarights.grid.restricted", data: "accessAllowed",
                    render: function (data) {
                        if (data) {
                            return '<input class="cdataright-select" type="checkbox" checked/>';
                        } else {
                            return '<input class="cdataright-select" type="checkbox"/>';
                        }
                    }
                },
                {title: "admin.usergroups.cdatarights.grid.token", data: "token"},
                {title: "admin.usergroups.cdatarights.grid.name", data: "name"}
            ];

            scope.read = function (data) {
                return SystemUser.getCatalogueRights($stateParams.userdata, scope.$parent.catalogueSelectedSu.value, {isAssigned: true});
            };

            scope.onSelect = function (data, index) {

            };

            scope.$on('save_cataloguesu_rights', function () {
                if (rowsChanged.length === 0) return;
                var dataObject = [];
                _.each(rowsChanged, function (val, key) {
                    var temp = grid.row(key).data();
                    temp.accessAllowed = val;
                    dataObject.push(temp);
                });

                SystemUser.saveCatalogueRights($stateParams.userdata, scope.$parent.catalogueSelectedSu.value, dataObject);
            });

            scope.$on('cataloguesu-dr-change', function(event, value){
                scope.catalogueValue = value;
                rowsChanged = {};
                scope.$broadcast(scope.events.refresh_all, {});
                //event.stopPropagation();
            })
        }

        function _postlinkfn() {
        }
    }

})();
