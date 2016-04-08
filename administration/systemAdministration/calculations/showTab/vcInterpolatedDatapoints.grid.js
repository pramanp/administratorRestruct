(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcInterpolatedDatapointsGrid', vcInterpolatedDatapointsGridDirective);

    function vcInterpolatedDatapointsGridDirective(Interpolation, Session, $q, $timeout) {
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
            var clrTimout;
            scope.options = {
                editable: false,
                exportable: true,
                filter: false,
                scrollX: true,
                selectable: false,
                deleteable: false,
				noDataInGridMsg:'sysadmin.calculation.interpolateddata'
            };
            scope.init = function (api) {
                grid = api;
                table = angular.element(grid.table().node());

                table.find('tbody').on('click', 'input.select-right', function (event) {
                    $timeout.cancel(clrTimout);
                    var $row = angular.element(this).closest('tr');
                    var rowIndex = grid.row($row).index();
                    if(_.isUndefined(rowsChanged[rowIndex]))
                        rowsChanged[rowIndex] = false;

                    rowsChanged[rowIndex] = angular.element(this).is(':checked');

                    var allChecked = true;
                    table.find('tbody tr input.select-right').each(function(){
                        if(!angular.element(this).is(':checked')) {
                            allChecked = false;
                        }
                    });
                    angular.element('.dataTables_scrollHead').find('thead input.select-all')[0].checked = allChecked;
                    
                    clrTimout = $timeout(function (){
                        _.each(rowsChanged, function(val, key){
                            if(val){
                            var temp = grid.row(key).data();
                            temp.status = val;
                            scope.properties_Arr.push(temp);
                            }
                        });
                    },100);
                });

                angular.element('.dataTables_scrollHead').find('thead').on('click', 'input.select-all', function(){
                    if (this.checked) {
                        table.find('tbody input.select-right[type="checkbox"]:not(:checked)').trigger('click');
                    } else {
                        table.find('tbody input.select-right[type="checkbox"]:checked').trigger('click');
                    }
                });
                
                grid.on('draw', function (settings) {
                    angular.element('.dataTables_scrollHead').find('thead input.select-all')[0].checked = false;
                });
            };
            scope.events  = {
                
            };
            
            scope.columns = [
                {
                    title: "<input type='checkbox' class='select-all'></input>", data: "selected",
                    width: '20px', orderable: false,
                    render: function (data,type) {
                        if (type === 'display'){
                            if (data) {
                                return '<input class="select-right" type="checkbox" checked/>';
                            } else {
                                return '<input class="select-right" type="checkbox"/>';
                            }
                        }
                        else
                            return '';
                    }
                },
                {title: "sysadmin.calculation.grid.property", data: "propertyId"},
                {title: "sysadmin.calculation.grid.type", data: "typeOfBuilding"},
                {title: "sysadmin.calculation.grid.gb", data: "gbAaNr"},
                {title: "sysadmin.calculation.grid.sap", data: "sapGb"},
                {title: "sysadmin.calculation.grid.identifiers", data: "bezeichner"},
                {title: "sysadmin.calculation.grid.device", data: "device"},
                {title: "sysadmin.calculation.grid.name", data: "name"},
                {title: "sysadmin.calculation.grid.address", data: "bmsAddress",
                     render: function (data, type) {
                        if (type === 'display') {
                            return '<a class="select-row" data-dismiss="modal">' + data + '</a>';
                        }else {
                            return data;
                        }

                    }
                },
                {title: "sysadmin.calculation.grid.datapoints", data: "dataPointsFunction"}
            ];
           
            scope.read = function () {
                var interpolationRealtyId =  Session.getSelectedRealtyId('interpolationRealtyId');
                var deferment = $q.defer();
                    Interpolation.one(interpolationRealtyId).customGET().then(function(resp){
                        deferment.resolve(resp);
                        if(resp.data.length === 0){
                            scope.showMessage = true;
                            table.parents('div.dataTables_wrapper').first().hide();
                        }
                        else{
                            scope.showMessage = false;
                            table.parents('div.dataTables_wrapper').first().show();
                        }
                        
                    });
                    return deferment.promise;
                };
                
            scope.onSelect = function (data, cellData) {
                scope.properties_Arr[data.rowIndex] = data;
                };
            }
        function _postlinkfn() {
        }
    }

})();
