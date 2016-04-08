(function () {
    'use strict';
    // Directive to show modal window

    angular.

            module('vitricon').

            directive('vcCrosstableEditpopup', vcCrosstableEditDirective);



    function vcCrosstableEditDirective($rootScope,SystemUser,vcGetCatMgrCrossTblDescFactory,Restangular) {
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

        function _prelinkfn(scope, el) {
            var grid = null;

            var table = null;
            scope.options = {
                editable: true,
                // exportable: true,
                // filter: false,
                updateable:true,
                deleteable: false,
                disableLocalization:true
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            
            var systemTable = vcGetCatMgrCrossTblDescFactory.getTableDesc();
            
            var param = {'isTableSwitched' : $rootScope.crossTableIsTableSwitched};
            Restangular.one('/admin/catalog/cross/edit_table').post("",{
              "tableID": $rootScope.crossTableId,
              "firstTable": $rootScope.crossFirstTable
            },param).then(function (result) {


                $rootScope.crossTableStartTable  = result.data.records[0].firstTableClassDisplayName;
                $rootScope.crossTableLinkedTable = result.data.records[0].secondTableClassDisplayName;
                angular.forEach(result.data.fields, function(value, key) {
                    if(value.dataType == "CheckBox"){
                      // scope.sampleRecordObj[key] = 0;
                        value.render = function (data, type) {
                            if (type === 'display') {

                                if (data === true) {

                                    return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';

                                } else {

                                    return '<input type="checkbox" class="group1" disabled="disabled" />';

                                }

                            }else {

                                return data;

                            }



                        };
                        
                        
                        value.vcedit= {

                            template: function (data) {

                                if (data.find('input.group1[type=checkbox]').is(':checked') === true)

                                {

                                    return '<input type="checkbox" class="group1" checked="checked" />';

                                } else

                                {

                                    return '<input type="checkbox" class="group1"  />';

                                }

                            },

                            extract: function (jqTd, rowData) {

                                //rowData.visibleAdministration = jqTd.find('input[type=checkbox]').is(':checked');

                                return jqTd.find('input').is(':checked');

                            }

                        };

                        
                        
                        
                        
                    }

                });
                
                var rowCount = 0;
                angular.forEach(result.data.records, function(value, key) {
                    rowCount++;
                    value.RowID = rowCount;
                });
                scope.COLUMN = result.data.records;
                
                scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                
            });

            scope.columns = [{title:"",data: ""}];
            scope.init = function (api) {

                grid = api;

                table = grid.table().node();



                $(table).find('tbody').on('click', 'input.group1[type=checkbox]', function (event) {

                    var tar = event.currentTarget;

                    var indexObject  = grid.cell($(tar).parent('td')).index();

                    var row = grid.row(indexObject.row);

                    var column = grid.column(indexObject.column);

                    

                    var dataSrc = column.dataSrc();



                    var data = row.data();



                    data[dataSrc] = $(tar).is(':checked');

                });

            };
            scope.events  = {recreate:'recreateSysgrid',addRow:'addROW'};
            // scope.events  = {addRow:'addROW'};
            
            // scope.read = function (data) {
                // return SystemUser.getList();
                // return 
            // };
            
            scope.update = function (data) {
             
                var request = [data];
                
                angular.forEach(scope.COLUMN, function(value, key) {
                    if(value.RowID == data.RowID){
                        value = data;

                    }
                    delete value.RowID;
                });
                scope.COLUMN;
                
                
                
                
                
                

                    if (data.dbId == 0) {

                        return systemTable.post(data);
                    } else {
                        return Restangular.all('/admin/catalog/cross').customPUT(scope.COLUMN, undefined, {'isTableSwitched' : $rootScope.crossTableIsTableSwitched}, undefined).then(function (resp) {

                                scope.refreshPopUP();
                            },function(error){

                                scope.refreshPopUP();
                            }
                        );
                        

                    }

            };
            
            
            
            scope.editor = {

                defaultRow: function () {

                    return  {
                        "tableID": parseInt(scope.SelectedTable),
                        "dbId": 0,
                        "createdBy": "",
                        "editedBy": "",
                        "number": 0,
                        "amount": 0,
                        "firstTable": "",
                        "secondTable": "",
                        "firstTableToken": "",
                        "secondTableToken": "",
                        "firstTableClassName": "",
                        "secondTableClassName": "",
                        "firstTableDisplayName": "",
                        "secondTableDisplayName": "",
                        "allSecondTables": [
                          ""
                        ],
                        "rule": "",
                        "typNumber": "",
                        "costGroupNo": 0,
                        "costGroupNoBac": 0,
                        "tablesSwitched": false,
                        "checked": false,
                        "editable": false,
                        "index": 0,
                        "token": "",
                        "designator": "",
                        "note": "",
                        "roomTypeNo": "",
                        "maintenanceGroup": "",
                        "costKind": "",
                        "areaUseGroup": "",
                        "dimension": "",
                        "costType": "",
                        "standardDimension": "",
                        "firstTableDescription": "",
                        "secondTableDescription": "",
                        "figureBWZK": "",
                        "baRelevant": false,
                        "storable": false,
                        "accumulating": false,
                        "manual": false,
                        "standardNND": 0,
                        "taxRate": 0,
                        "effectiveAreaMain": 0,
                        "effectiveArea": 0,
                        "baseAreaNetto": 0,
                        "baseAreaBrutto": 0,
                        "referenceValueHeat": 0,
                        "referenceValueElectricity": 0,
                        "lowerPrice": 0,
                        "middlePrice": 0,
                        "highPrice": 0,
                        "country": "",
                        "federalState": "",
                        "account": 0,
                        "active": false,
                        "category": "",
                        "subCategory": "",
                        "fixtures": false,
                        "stationNr": "",
                        "icao": "",
                        "stationName": "",
                        "geoHeight": "",
                        "geoLatitude": "",
                        "geoLongitude": "",
                        "kmCoordinates": "",
                        "longtimeAVGGTZ": 0,
                        "defaultNormativeUsefulLife": 0
                      };

                }

            };

            scope.onSelect = function (data, index) {
                alert(data.firstTable);
                scope.editPopUp(data);
            };
            
            
            
/////////////////////////////////////////// Fix this
scope.refreshPopUP = function(){
    
            var systemTable = vcGetCatMgrCrossTblDescFactory.getTableDesc();
            var param = {'isTableSwitched' : $rootScope.crossTableIsTableSwitched};
            Restangular.one('/admin/catalog/cross/edit_table').post("",{
              "tableID": $rootScope.crossTableId,
              "firstTable": $rootScope.crossFirstTable
            },param).then(function (result) {
                
                angular.forEach(result.data.fields, function(value, key) {
                    if(value.dataType == "CheckBox"){
                      // scope.sampleRecordObj[key] = 0;
                        value.render = function (data, type) {
                            if (type === 'display') {

                                if (data === true) {

                                    return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';

                                } else {

                                    return '<input type="checkbox" class="group1" disabled="disabled" />';

                                }

                            }else {

                                return data;

                            }



                        };
                        
                        
                        value.vcedit= {

                            template: function (data) {

                                if (data.find('input.group1[type=checkbox]').is(':checked') === true)

                                {

                                    return '<input type="checkbox" class="group1" checked="checked" />';

                                } else

                                {

                                    return '<input type="checkbox" class="group1"  />';

                                }

                            },

                            extract: function (jqTd, rowData) {

                                //rowData.visibleAdministration = jqTd.find('input[type=checkbox]').is(':checked');

                                return jqTd.find('input').is(':checked');

                            }

                        };

                        
                        
                        
                        
                    }

                });
                
                var rowCount = 0;
                angular.forEach(result.data.records, function(value, key) {
                    rowCount++;
                    value.RowID = rowCount;
                });
                scope.COLUMN = result.data.records;
                
                scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                
            });
    
    
    
}
/////////////////////////////////////////// Fix this
            
            
            
        }

        function _postlinkfn() {
        }
        

    }
    

})();
