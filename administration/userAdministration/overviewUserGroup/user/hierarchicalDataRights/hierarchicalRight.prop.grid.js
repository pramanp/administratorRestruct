(function () {
    'use strict';

    angular.module('vitricon').directive('vcHierarchicalRightPropGrid', hierarchicalRightPropGridDirective);

    function hierarchicalRightPropGridDirective(User, $stateParams) {
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

                    var allChecked = true;
                    table.find('tbody tr input.select-right').each(function(){
                        if(!$(this).is(':checked')) {
                            allChecked = false;
                        }
                    });
                    table.find('thead input.select-all')[0].checked = allChecked;
                });

                table.find('thead').on('click', 'input.select-all', function(){
                    if (this.checked) {
                        table.find('tbody input.select-right[type="checkbox"]:not(:checked)').trigger('click');
                    } else {
                        table.find('tbody input.select-right[type="checkbox"]:checked').trigger('click');
                    }
                });
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "<input type='checkbox' class='select-all'></input>", data: "status",
                    width: '20px', orderable: false,
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
                return User.getDataRights($stateParams.userdata);
            };

            scope.$on('save_property_rights', function () {
                var dataObject = [];
                _.each(rowsChanged, function(val, key){
                    var temp = grid.row(key).data();
                    temp.status = val;
                    dataObject.push(temp);
                });

                User.saveDataRights(dataObject);
            });

        }

        function _postlinkfn() {
        }
    }

})();
