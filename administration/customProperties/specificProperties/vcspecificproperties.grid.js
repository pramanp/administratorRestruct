(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcSpecificPropertiesGrid', vcSpecificPropertiesGridDirective);

    function vcSpecificPropertiesGridDirective(Session, SpecificProperties,
        $timeout, $q, Messaging) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            }
            //controller: 'SpecificPropertyController'
        };

        return ddo;

        function _prelinkfn(scope, el) {

            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                scrollX: true,
                visible: false,
                deleteable: false
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "specificprop.grid.shortness", data: "category", visible: false},
                {title: "", data: "",
                    render: function (data, type) {
                        if (type === 'display')
                            return '<a class="select-row"><input class="select-row" type="checkbox" readonly="readonly" value="" /></a>';
                            // return '<input class="select-row" type="checkbox" readonly="readonly" value="" />';
                        else
                            return '';
                    }, editable: true
                },
                {title: "specificprop.grid.shortness", data: "tokenItem",
                    render: function (data, type) {
                        if (type == 'display') {
                            scope.options = [];
                            var temp = '<select class="group1" >';
                            _.each(scope.tokenList, function (obj) {
                                if (obj.index == data.index) {
                                    temp += '<option value="' + obj.index + '" selected>' + obj.displayName + '</option>';
                                } else {
                                    temp += '<option value="' + obj.index + '">' + obj.displayName + '</option>';
                                }
                            });

                            temp += '</select>';
                            return temp;
                        } else
                            return data;


                    }
                },
                {title: "specificprop.grid.identifiers", data: "designator",
                    render: function (data, type) {
                        if (type == 'display')
                            return '<input type="text" class="group1" ng-model="' + data + '" value="' + data + '"/>';
                        else
                            return data;
                    }
                },
                {title: "specificprop.grid.datatype", data: "dataTypeItem",
                    render: function (data, type) {
                        if (type == 'display') {
                            var temp = '<select class="group1" >';
                            _.each(scope.dataTypeList, function (obj) {
                                if (obj.index == data.index) {
                                    temp += '<option value="' + obj.index + '" selected>' + obj.displayName + '</option>';
                                } else {
                                    temp += '<option value="' + obj.index + '">' + obj.displayName + '</option>';
                                }

                            });

                            temp += '</select>';
                            return temp;
                        } else
                            return data;
                    }
                },
                {title: "specificprop.grid.category", data: "categoryItem",
                    render: function (data, type) {
                        if (type == 'display') {
                            var temp = '<select class="group1" >';
                            _.each(scope.categoryList, function (obj) {
                                if (obj.index == data.index) {
                                    temp += '<option value="' + obj.index + '" selected>' + obj.displayName + '</option>';
                                } else {
                                    temp += '<option value="' + obj.index + '">' + obj.displayName + '</option>';
                                }

                            });

                            temp += '</select>';
                            return temp;
                        } else
                            return data;
                    }
                },
                {title: "specificprop.grid.description", data: "description",
                    render: function (data, type) {
                        if (type == 'display') {
                            return '<input type="text" class="group1" value="' + data + '"/>';
                        } else
                            return data;
                    }
                },
                {title: "specificprop.grid.order", data: "order",
                    render: function (data, type) {
                        if (type == 'display') {
                            return '<input type="text" class="group1" value="' + data + '"/>';
                        } else
                            return data;
                    }
                }

            ];
            scope.pageindex = 0;

            scope.read = function (data) {
                var deferment = $q.defer();

                var properties_index = Session.getPropertiesIndex('properties_index');
                var rowCollection = [];
                scope.featureData.index = properties_index;
                SpecificProperties.one('tokens').customPOST(scope.featureData).then(function (resp) {
                    scope.tokenList = resp.data;
                    scope.selectedToken = resp.data[0].index;
                    SpecificProperties.customGET(properties_index + '/' + scope.is_edit_only).then(function (resp) {
                        _.each(resp.data, function (data, key) {
                            if (data.extraPropertyRSList) {
                                _.each(data.extraPropertyRSList, function (rowData) {
                                    rowData.category = data.category;
                                    rowCollection.push(rowData);
                                });
                            }
                        });

                        deferment.resolve(rowCollection);

                    });
                });

                return deferment.promise;

            };

            var grid = null;
            var table = null;
            var promise;
            scope.init = function (api) {
                grid = api;

                grid.on('draw', function (settings) {
                    var api = grid;
                    var rows = api.rows({page: 'current'}).nodes();
                    var last = null;
                    api.column(2, {page: 'current'}).data().each(function (group, i) {
                        if (last !== group) {
                            $(rows).eq(i).before(
                                    '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                                    );

                            last = group;
                        }
                    });
                });

                table = grid.table().node();

                $(table).find('tbody').on('keyup', 'input.group1[type=text]', function (event) {
                    $timeout.cancel(promise);
                    promise = $timeout(function () {
                        var tar = event.currentTarget;
                        var indexObject = grid.cell($(tar).parent('td')).index();
                        var row = grid.row(indexObject.row);
                        var column = grid.column(indexObject.column);

                        var dataSrc = column.dataSrc();

                        var data = row.data();
                        data[dataSrc] = $(tar).val();
                    }, 200);

                });

                $(table).find('tbody').on('change', 'select.group1', function (event) {

                    var tar = event.currentTarget;
                    var indexObject = grid.cell($(tar).parent('td')).index();
                    var row = grid.row(indexObject.row);
                    var column = grid.column(indexObject.column);

                    var dataSrc = column.dataSrc();

                    var data = row.data();
                    data[dataSrc].index = parseInt($(tar).val());
                    data[dataSrc].displayName = $(tar).find('option:selected').text();


                });

                SpecificProperties.one('data_type').customGET().then(function (resp) {
                    scope.dataTypeList = resp.data;
                    //vm.propertyData.dataTypeItem.index = vm.selectedDatatype;
                    //vm.propertyData.dataTypeItem.displayName = resp.data[0].displayName;
                });

                SpecificProperties.customGET('category').then(function (resp) {
                    scope.categoryList = resp.data;
                    //vm.propertyData.categoryItem.index = vm.selectedDatatype;
                    //vm.propertyData.categoryItem.displayName = resp.data[0].displayName;

                });

            };

            scope.onSelect = function (data, cellData) {
                scope.properties_Arr[data.rowIndex] = data;
            };

            scope.update = function (data) {
                var request = [];
                request = [data];
                if (data.id === null) {
                    return SpecificProperties.post(data);
                } else {
                    return SpecificProperties.one().customPUT(request);
                }
            };

            scope.delete = function (data) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you want to delete this property?', function (val) {
                        if (val === 'ok') {
                            SpecificProperties.one(Session.getPropertiesIndex('properties_index')).customDELETE().then(function (response) {
                                deferment.resolve(response);
                                scope.$broadcast('refresh_all');
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
