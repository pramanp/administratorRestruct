(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcPropertiesGrid', vcPropertiesGridDirective);

    function vcPropertiesGridDirective(Properties, $timeout, $state, Session, toastr,
            $q, Messaging, Restangular) {
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
                scrollX: true,
                selectable: false,
                deleteable: false
            };
            scope.events = {
                recreate: 'recreatePropertiesGrid'
            };

            scope.columns = [
                {title: "properties.grid.category", data: "category_designator", visible: false},
                {title: "", data: "",
                    render: function (data, type) {
                        if (type === 'display')
                            return '<a class="select-row"><input class="select-row" type="checkbox" readonly="readonly" value="" /></a>';
                            // return '<input class="select-row" type="checkbox" readonly="readonly" value="" />';
                        else
                            return '';
                    }, editable: true
                },
                {title: "properties.grid.name", data: "designator",
                    render: function (data, type) {
                        if (type === 'display') {
                            return '<input type="text" class="group1" ng-model="' + data + '" value="' + data + '"/>';
                        } else {
                            return data;
                        }

                    }
                },
                {title: "properties.grid.datatype", data: "specialMaskDataTypeId",
                    render: function (data, type) {
                        if (type === 'display') {
                            scope.specialMaskDataTypeId = data;
                            var temp = '<select class="group1" >';
                            _.each(scope.dataTypeList, function (obj) {
                                if (obj.index === data) {
                                    temp += '<option value="' + obj.index + '" selected>' + obj.displayName + '</option>';
                                } else {
                                    temp += '<option value="' + obj.index + '">' + obj.displayName + '</option>';
                                }
                            });

                            temp += '</select>';
                            return temp;
                        } else {
                            return data;
                        }

                    }
                },
                {title: "properties.grid.category", data: "categoryId",
                    render: function (data, type) {
                        if (type === 'display') {
                            var temp = '<select class="group1" >';
                            _.each(scope.categoryList, function (obj) {
                                if (obj.categoryId === data) {
                                  temp += '<option value="' + obj.categoryId + '" selected>' + obj.designator + '</option>';
                                } else {
                                    temp += '<option value="' + obj.categoryId + '">' + obj.designator + '</option>';
                                }

                            });

                            temp += '</select>';
                            return temp;
                        } else {
                            return data;
                        }

                    }
                },
                {title: "properties.grid.default", data: "defaultValue",
                    render: function (data, type) {
                        if (type === 'display') {
                            if (scope.specialMaskDataTypeId === 1) {
                                return '<input type="text" class="group1" value=' + data + '>';
                            } else if (scope.specialMaskDataTypeId === 2) {
                                return '<input type="number" class="group1" step="0.01" value=' + data + ' />';
                            } else if (scope.specialMaskDataTypeId ===3) {
                                if (data === "true")
                                {
                                    return '<input type="checkbox" class="group1" checked="checked" />';
                                } else
                                {
                                    return '<input type="checkbox" class="group1"/>';
                                }

                            } else if (scope.specialMaskDataTypeId === 4) {
                                return '<input type="text" class="group1 datepicker" value=' + data + '>';
                            } else if (scope.specialMaskDataTypeId === 5) {
                                if (data === '' || data === null) {
                                    return '<input type="text" class="group1" value=' + data + '></input>';
                                } else {
                                    return '<input type="text" class="group1" value=' +
                                            data + '></input><a class="iconUrl" target="_blank" href="http://' + data + '"  />';

                                }

                            } else if (scope.specialMaskDataTypeId === 6) {
                                return '<textarea cols="30" rows="5" class="group1">' + data + '</textarea>';
                            } else if (scope.specialMaskDataTypeId === 7) {
                                return '<input type="text" class="group1" value=' + data + '>';
                            } else if (scope.specialMaskDataTypeId === 8) {
                                return '<input type="text" class="group1" value=' + data + '>';
                            } else if (scope.specialMaskDataTypeId === 9) {
                                return '<input type="text" class="group1" value=' + data + '>';
                            }
                        } else {
                            return data;
                        }


                    }
                }
            ];

            scope.read = function () {
                var deferment = $q.defer();
                var rowCollection = [];

                if (Session.getGridReload('GridReload') === 'true') {
                    Session.setGridReload('GridReload', false);
                    var gridData = Session.getGridData();
                    _.each(gridData, function (data, key) {
                        rowCollection.push(data);
                    });
                    deferment.resolve(rowCollection);
                } else {
                    Properties.one('data_type').customGET().then(function (resp) {
                        scope.dataTypeList = resp.data;
                        Properties.customGET().then(function (resp) {
                            _.each(resp.data, function (data, key) {
                                if (data.specialMaskPropertyDTO) {
                                    _.each(data.specialMaskPropertyDTO, function (rowData) {
                                        rowData.categoryId = data.categoryId;
                                        rowData.category_designator = data.designator;
                                        rowCollection.push(rowData);
                                    });
                                }
                            });

                            deferment.resolve(rowCollection);

                        });

                    });
                }
                Session.setGridReload('GridReload', false);
                return deferment.promise;

            };


            /**
             * init function to get the data type and category information
             * @private
             */
            var grid = null;
            var table = null;
            var promise;
            scope.init = function (api) {
                Session.setGridReload('GridReload', false);
                grid = api;
                table = angular.element(grid.table().node());
                grid.on('draw', function (settings) {
                    var api = grid;
                    var rows = api.rows({page: 'current'}).nodes();
                    var last = null;
                    api.column(2, {page: 'current'}).data().each(function (group, i) {
                        if (last !== group) {
                            angular.element(rows).eq(i).before(
                                    '<tr class="group" style="font-weight:bold"><td colspan="6">' + group + '</td></tr>'
                                    );

                            last = group;
                        }
                    });
                    angular.element(grid.table().node()).find('tbody .datepicker').datepicker({
                        format: "dd.mm.yyyy",
                        showOn: "button",
                        buttonImage: "../assets/images/calendar-icon.png",
                        buttonImageOnly: true,
                        buttonText: "Select date"
                    });
                });

                Properties.customGET().then(function (resp) {
                    scope.categoryList = resp.data;

                });

                table = grid.table().node();



                angular.element(table).find('tbody').on('change', 'input.group1[type=text]', function (event) {
                    $timeout.cancel(promise);

                    promise = $timeout(function () {
                        var tar = event.currentTarget;
                        var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                        var row = grid.row(indexObject.row);
                        var column = grid.column(indexObject.column);

                        var dataSrc = column.dataSrc();

                        var data = row.data();
                        data[dataSrc] = angular.element(tar).val();
                    }, 200);

                });



                angular.element(table).find('tbody').on('change', 'input.group1[type=number]', function (event) {
                    $timeout.cancel(promise);
                    promise = $timeout(function () {
                        var tar = event.currentTarget;
                        var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                        var row = grid.row(indexObject.row);
                        var column = grid.column(indexObject.column);

                        var dataSrc = column.dataSrc();

                        var data = row.data();
                        data[dataSrc] = angular.element(tar).val();
                    }, 200);

                });

                angular.element(table).find('tbody').on('keyup', 'textarea.group1', function (event) {
                    $timeout.cancel(promise);
                    promise = $timeout(function () {
                        var tar = event.currentTarget;
                        var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                        var row = grid.row(indexObject.row);
                        var column = grid.column(indexObject.column);

                        var dataSrc = column.dataSrc();

                        var data = row.data();
                        data[dataSrc] = angular.element(tar).val();
                    }, 200);

                });

                angular.element(table).find('tbody').on('keyup', 'input.group1[type=date]', function (event) {
                    $timeout.cancel(promise);
                    promise = $timeout(function () {
                        var tar = event.currentTarget;
                        var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                        var row = grid.row(indexObject.row);
                        var column = grid.column(indexObject.column);

                        var dataSrc = column.dataSrc();

                        var data = row.data();
                        data[dataSrc] = angular.element(tar).val();
                    }, 200);

                });

                angular.element(table).find('tbody').on('click', 'input.group1[type=checkbox]', function (event) {
                    var tar = event.currentTarget;
                    var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                    var row = grid.row(indexObject.row);
                    var column = grid.column(indexObject.column);

                    var dataSrc = column.dataSrc();

                    var data = row.data();

                    data[dataSrc] = angular.element(tar).is(':checked');
                });



                angular.element(table).find('tbody').on('change', 'select.group1', function (event) {

                    var tar = event.currentTarget;
                    var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                    var row = grid.row(indexObject.row);
                    var column = grid.column(indexObject.column);

                    var dataSrc = column.dataSrc();

                    var data = row.data();
                    data[dataSrc] = parseInt(angular.element(tar).val());

                    if (dataSrc === 'specialMaskDataTypeId')
                        data['specialMaskDataType'] = angular.element(tar).find('option:selected').text();
                    else
                        data['category_designator'] = angular.element(tar).find('option:selected').text();
                    if (dataSrc === 'specialMaskDataTypeId') {
                        $timeout(function () {
                            data['defaultValue'] = '';
                            Session.setGridReload('GridReload', true);
                            Session.setGridData(grid.data());
                            scope.$broadcast('refresh_all');
                        }, 1000);
                    }

                });


            };

            scope.onSelect = function (data, cellData) {
                scope.properties_Arr[data.rowIndex] = data;
            };


            scope.delete = function (data) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you want to delete this property?', function (val) {
                        if (val === 'ok') {
                            Properties.one().customDELETE(data.id).then(function (response) {
                                deferment.resolve(response);
                                scope.$broadcast('refresh_all');
                                toastr.success('Specific Properties Deleted.');
                            });
                        }

                    });
                }, 1000);
            };

        }

        function _postlinkfn() {
        }
    }

})();
