(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcMandatorsOperatorGrid', vcMandatorsOperatorGridDirective);

    function vcMandatorsOperatorGridDirective(Customer, $q, $timeout, License) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            controller: 'MandatorsController'
        };

        return ddo;

        function _prelinkfn(scope, el) {
            scope.options = {
                editable: true,
                exportable: true,
                filter: false,
                scrollX: true,
                deleteable: false
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "admin.mandators.grid.man", data: "mandtatorName", editable: false
                },
                {title: "admin.mandators.grid.maxOp", data: "maxOperatorValue", 
                    render: function (data, type) {
                        if (type == 'display'){
                            if(scope.maxOperatorValue == -1)
                                return '<span>Unlimited</span>'
                            else
                                return '<input style="width:45px" type="number" min="0" max="'+scope.maxOperatorValue+'" class="group1" ng-model="' + data + '" value="' + data + '"/>';
                        }
                            
                        else
                            return data;
                    },
                    editable: false},
                {title: "admin.mandators.grid.maxConOp", data: "maxConcurrentOperators", 
                    render: function (data, type) {
                        if (type == 'display'){
                            if(scope.maxConcurrentOperators == -1)
                                return '<span>Unlimited</span>'
                            else
                                return '<input style="width:45px" type="number" min="0" max="'+scope.maxConcurrentOperators+'" class="group1" ng-model="' + data + '" value="' + data + '"/>'
                            }
                        else
                            return data;
                    },
                    editable: false},
                {title: "admin.mandators.grid.maxVitriOp", data: "maxVitricadOperators",
                    render: function (data, type) {
                        if (type == 'display'){
                            if(scope.maxVitricadOperators == -1)
                                return '<span>Unlimited</span>'
                            else
                                return '<input style="width:45px" type="number" min="0" max="'+scope.maxVitricadOperators+'" class="group1" ng-model="' + data + '" value="' + data + '"/>';
                            }
                        else
                            return data;
                    },
                    editable: false}
            ];
            
            var grid = null;
            var table = null;
            var promise;
            
            scope.init = function (api) {
                grid = api;
                table = grid.table().node(); 
                
                angular.element(table).find('tbody').on('keyup mouseup', 'input.group1[type=number]', function (event) {
                    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                        return false;
                    }
                    
                    $timeout.cancel(promise);
                    promise = $timeout(function () {
                        var tar = event.currentTarget;
                        var indexObject = grid.cell($(tar).parent('td')).index();
                        var row = grid.row(indexObject.row);
                        var column = grid.column(indexObject.column);

                        var dataSrc = column.dataSrc();

                        var data = row.data();
                        data[dataSrc] = $(tar).val();
                        scope.mandatorRSsList = grid.data();
                    }, 200);
                });
                
                Customer.customGET().then(function (resp) {
                    scope.customerNameList = resp.data;

                    scope.customerName = '' + resp.data[0].id + '';
                    scope.customerNameValue = resp.data[0].designator;
                });
            };

            scope.read = function (data) {
                var deferment = $q.defer();
                if(scope.customerName){
                    License.customGET(scope.customerName).then(function (resp) {
                            scope.customerRSs = resp.data;

                            scope.maxMandator = scope.customerRSs.maxMandator;
                            scope.maxOperatorValue = scope.customerRSs.maxOperatorValue;
                            scope.maxConcurrentOperators = scope.customerRSs.maxConcurrentOperators;
                            scope.maxVitricadOperators = scope.customerRSs.maxVitricadOperators;
                            scope.mandatorRSsList = scope.customerRSs.mandatorRSs;
                       
                        

                        deferment.resolve(scope.mandatorRSsList);

                    },function (resp){
                            scope.maxMandator = '';
                            scope.maxOperatorValue = '';
                            scope.maxConcurrentOperators = '';
                            scope.maxVitricadOperators = '';
                            scope.mandatorRSsList = [];
                    });
                }
                return deferment.promise;

            };

            scope.onSelect = function (data, index) {
                
            };

            scope.update = function (data) {
//                
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
