(function () {
    'use strict';

    angular.module('vitricon').directive('vcSysuserSuHierarchicalRightBuildingGrid', hierarchicalRightBuildingGridDirective);

    function hierarchicalRightBuildingGridDirective(SystemUser, $stateParams) {
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

                table.find('tbody').on('click', 'input.building-select', function (event) {
                    var $row = $(this).closest('tr');
                    var rowIndex = grid.row($row).index();
                    if(_.isUndefined(rowsChanged[rowIndex]))
                        rowsChanged[rowIndex] = false;

                    rowsChanged[rowIndex] = $(this).is(':checked');

                    var allChecked = true;
                    table.find('tbody tr input.building-select').each(function(){
                        if(!$(this).is(':checked')) {
                            allChecked = false;
                        }
                    });
                    table.find('thead input.select-all')[0].checked = allChecked;
                });

                table.find('thead').on('click', 'input.select-all', function(){
                    if (this.checked) {
                        table.find('tbody input.building-select[type="checkbox"]:not(:checked)').trigger('click');
                    } else {
                        table.find('tbody input.building-select[type="checkbox"]:checked').trigger('click');
                    }
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
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "<input type='checkbox' class='select-all'></input>", data: "accessAllowed",
                    width: '20px', orderable: false,
                    render: function (data) {
                        if (data) {
                            return '<input class="building-select" type="checkbox" checked/>';
                        } else {
                            return '<input class="building-select" type="checkbox"/>';
                        }
                    }
                },
                {title: "admin.usergroups.hdatarights.grid.administrator", data: "administrator",},
                {title: "admin.usergroups.hdatarights.grid.propertyname", data: "propertyName"},
                {title: "admin.usergroups.hdatarights.grid.type", data: "buildingType"},
                {title: "admin.usergroups.hdatarights.grid.name", data: "buildingName"}
            ];

            scope.read = function (data) {
                return SystemUser.getDataRightsBuildings($stateParams.userdata, {isAssigned: false});
            };

            scope.onSelect = function (data, index) {

            };

            scope.$on('save_buildingsu_rights', function () {
                if (rowsChanged.length === 0) return;
                var dataObject = [];
                _.each(rowsChanged, function (val, key) {
                    var temp = grid.row(key).data();
                    temp.accessAllowed = val;
                    dataObject.push(temp);
                });

                SystemUser.saveDataRightsBuilding(dataObject);
                rowsChanged = [];
            });
        }

        function _postlinkfn() {
        }
    }

})();
