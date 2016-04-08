(function () {
    'use strict';

    angular.module('vitricon').directive('vcUsergroupCatalogueRights', vcUsergroupCatalogueRights);

    function vcUsergroupCatalogueRights(User, $stateParams) {
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
                    var allChecked = true;
                    table.find('tbody tr input.cdataright-select').each(function(){
                        if(!$(this).is(':checked')) {
                            allChecked = false;
                        }
                    });
                    table.find('thead input.select-all')[0].checked = allChecked;
                });

                table.find('thead').on('click', 'input.select-all', function(){
                    if (this.checked) {
                        table.find('tbody input.cdataright-select[type="checkbox"]:not(:checked)').trigger('click');
                    } else {
                        table.find('tbody input.cdataright-select[type="checkbox"]:checked').trigger('click');
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
                refresh_all: 'admin.usergrop-cataloguerights.grid.js_grid_all',
                refresh_row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "<input type='checkbox' class='select-all'></input>", data: "status",
                    width: '20px', orderable: false,
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
                return User.getCatalogueRights($stateParams.userdata, scope.$parent.catalogueSelected.value);            };

            scope.onSelect = function (data, index) {

            };

            scope.$on('save_catalogue_rights', function () {
                var dataObject = [];
                _.each(rowsChanged, function (val, key) {
                    var temp = grid.row(key).data();
                    temp.status = val;
                    dataObject.push(temp);
                });

                User.saveCatalogueRights($stateParams.userdata, scope.catalogueValue, dataObject);
            });

            scope.$on('catalogue-dr-change', function(event, value){
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
