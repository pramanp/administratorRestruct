(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcSystemTablesGrid', vcsystemtablesGridDirective);

    function vcsystemtablesGridDirective (SystemUser,vcGetCatMgrSysTblDescFactory) {
        var ddo = {
            restrict: 'E',
            // scope: false,
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
            

            var systemTable = vcGetCatMgrSysTblDescFactory.getTableDesc();
            systemTable.customGET(scope.SelectedTable).then(function (result) {
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
                scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                
                // scope.sampleRecordObj = {};
                // angular.forEach(result.data.records[0], function(value, key) {
                  // if(key == "dbId"){scope.sampleRecordObj[key] = 0;}
                  // else if(key == "tableID"){scope.sampleRecordObj[key] = parseInt(scope.SelectedTable);}
                  // else{
                      // if(angular.isNumber(result.data.records[0][key])){
                        // scope.sampleRecordObj[key] = 0;
                      // } else {
                        // scope.sampleRecordObj[key]="";
                      // }
                      
                    // }
                // });
                
            });

            // scope.columns = [
                // {title: "LLLLLLLLLLL", data: "login"},
                // {title: "admin.systemuser.grid.lastlogin", data: "lastLogin"},
                // {title: "admin.systemuser.grid.locked", data: "locked",
                    // render: function(data) {
                        // return '<input type="checkbox" readonly="readonly" value="'+data+'"/>';
                    // }
                // },
                // {title: "admin.systemuser.grid.lockreason", data: "lockReason"},
                // {title: "admin.systemuser.grid.creationdate", data: "createdDate"},
            // ];
            scope.columns = scope.ColumnName;
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
             
                // var request = [];
                // request = data;
                // if(data){
                    if (data.dbId == 0) {
                        return systemTable.post(data).then(function (resp) {
                                // scope.$broadcast('refresh_all');
                                scope.getTable();
                            },function(error){
                                // scope.$broadcast('refresh_all');
                                scope.getTable();
                            }
                        );
                    } else {
                        return systemTable.one().customPUT(data).then(function (resp) {
                                // scope.$broadcast('refresh_all');
                                scope.getTable();
                            },function(error){
                                // scope.$broadcast('refresh_all');
                                scope.getTable();
                            }
                        );
                    }
                // }
            };
            
            
            
            scope.editor = {

                defaultRow: function () {

                    return  {
                      "tableID": parseInt(scope.SelectedTable),
                      "dbId": 0,
                      "number": 0,
                      "typNumber": "",
                      "costGroupNo": 0,
                      "costGroupNoBac": 0,
                      "checked": false,
                      "editable": false,
                      "index": 0,
                      "amount": 0,
                      "firstTable": "",
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
                      "description": "",
                      "figureBWZK": "",
                      "baRelevant": false,
                      "storable": false,
                      "accumulating": false,
                      "manual": false,
                      "standardNND": "",
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
                      "date": "",
                      "validFrom": "",
                      "validUntil": "",
                      "createdBy": "",
                      "editedBy": "",
                      "referenceAdministration": false,
                      "referenceRealty": false,
                      "referenceBuilding": false,
                      "referenceOutsideInstallation": false,
                      "referenceInstallation": false,
                      "referenceInstallationPart": false,
                      "referenceDevice": false,
                      "referenceRoom": false,
                      "referenceProject": false,
                      "referenceTaskPacket": false,
                      "referenceOrganisation": false,
                      "referenceDivision": false,
                      "referenceDepartment": false,
                      "referencePerson": false,
                      "referenceArticle": false,
                      "referenceInventory": false,
                      "referenceKey": false,
                      "referenceLeaseUnit": false,
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
                      "factor": 0,
                      "tableName": "",
                      "installationToken": "",
                      "installationPartToken": "",
                      "deviceToken": "",
                      "regisFacilityNo": "",
                      "shortDesignator": "",
                      "district": "",
                      "ownerNo": "",
                      "no": "",
                      "tableHeaders": 0,
                      "folderPath": "",
                      "defaultNormativeUsefulLife":""
                    };

                }

            };

            scope.onSelect = function (data, index) {

            };
        }

        function _postlinkfn() {
        }
    }

})();
